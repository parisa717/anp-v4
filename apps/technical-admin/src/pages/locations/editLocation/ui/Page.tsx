import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal, InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import {  useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useGetAreasQuery } from '@/entities/area'
import { useGetBrandsQuery } from '@/entities/brand'
import { useGetCountriesQuery } from '@/entities/country'
import { useGetLocationQuery, useUpdateLocationMutation } from '@/entities/location'
import { pageUrls } from '@/shared/lib'

import { EditLocationFormSchema, editLocationFormSchema } from '../model/formSchema'

const EditLocationList = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.locations.editLocation.${key}`)
  const { data: areas, isLoading: isLoadingAreas, isError: isAreasError } = useGetAreasQuery()
  const {
    data: activeBrands,
    isLoading: isLoadingBrands,
    isError: isBrandsError,
  } = useGetBrandsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.filter((brand) => brand.isActive),
    }),
  })
  const { data: countries, isLoading: isLoadingCountries, isError: isCountriesError } = useGetCountriesQuery()

  const { id = '' } = useParams<{ id: string }>()

  const { data: locationData } = useGetLocationQuery({ id })
 
  const navigate = useNavigate()

    const [updateLocation, { isLoading: isUpdating }] = useUpdateLocationMutation()
  

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<EditLocationFormSchema>({
    resolver: zodResolver(editLocationFormSchema(t)),
    defaultValues: {
      area: locationData?.area.id,
      code: locationData?.code ,
      name: locationData?.name,
      zipCode: locationData?.address?.postCode,
      city: locationData?.address?.city,
      address: locationData?.address?.address,
      brands: [{ id: locationData?.brands[0].id }],
    },
  })
  const { fields, append } = useFieldArray<EditLocationFormSchema>({
    control,
    name: 'brands',
  })
  const watchBrandIds = watch('brands')

  const onSubmitHandler = async (data: EditLocationFormSchema) => {
    await updateLocation({
      location: {
        ...data,
        id: id,
        brands: data.brands.map(({ id }) => ({ id })),
        address: {
          address: data.address,
          city: data.city,
          country: { id: data.country },
          postCode: data.zipCode,
        },
        area: { id: data.area },
      },
    })
    navigate(pageUrls.locations.root())

  }

  const handleCancelClick = () => {
    navigate(pageUrls.locations.root())
  }

  const handleSaveClick = () => {
    handleSubmit(onSubmitHandler)()
  }



  if (isAreasError || isBrandsError || isCountriesError) {
    // TODO: Add proper error handling
    return 'Error'
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      onSaveClick={handleSaveClick}
      width="28%"
      minWidth={632}
      title={"Standort bearbeiten"}
      isUpdating={isUpdating}
    >
      <form className="mt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-3 mb-6">
          <SelectBoxFormField
            name="area"
            label={translate('form.fields.area')}
            hasFloatLabel
            options={areas?.map((area) => ({ value: area.id, label: `${area.code} | ${area.name}` }))}
            control={control}
            className={{
              input: 'w-full',
            }}
            error={errors.area}
            loading={isLoadingAreas}
          />
         
        </div>
        <div className="flex flex-row items-center gap-2">
          <InputTextFormField
            type="number"
            name="code"
            label={translate('form.fields.locationId')}
            hasFloatLabel
            control={control}
            error={errors.code}
            className={{
              container: 'basis-1/3 min-w-0',
              input: 'w-full',
            }}
          />
          <InputTextFormField
            type="text"
            name="name"
            label={translate('form.fields.locationName')}
            hasFloatLabel
            control={control}
            error={errors.name}
            className={{
              container: 'basis-2/3',
              input: 'w-full',
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <InputTextFormField
            type="text"
            name="zipCode"
            label={translate('form.fields.zipCode')}
            hasFloatLabel
            control={control}
            error={errors.zipCode}
            className={{
              container: 'basis-1/3 min-w-0',
              input: 'w-full',
            }}
          />
          <InputTextFormField
            type="text"
            name="city"
            label={translate('form.fields.city')}
            hasFloatLabel
            control={control}
            error={errors.city}
            className={{
              container: 'basis-2/3',
              input: 'w-full',
            }}
          />
        </div>
        <InputTextFormField
          type="text"
          name="address"
          label={translate('form.fields.address')}
          hasFloatLabel
          control={control}
          error={errors.address}
          className={{
            input: 'w-full',
          }}
        />
        <SelectBoxFormField
          name="country"
          label={translate('form.fields.country')}
          hasFloatLabel
          options={countries?.map((country) => ({ value: country.id, label: country.name }))}
          control={control}
          className={{
            input: 'w-full',
          }}
          error={errors.country}
          loading={isLoadingCountries}
        />
        <div>
          <div className="flex flex-col gap-6">
            {fields.map((field, index) => (
              <SelectBoxFormField
                key={field.id}
                name={`brands.${index}.id`}
                label={translate('form.fields.brand')}
                hasFloatLabel
                options={activeBrands?.map((brand) => ({
                  value: brand.id,
                  label: brand.name,
                  disabled: watchBrandIds.some((selectedBrand) => selectedBrand.id === brand.id),
                }))}
                control={control}
                className={{
                  input: 'w-full',
                }}
                loading={isLoadingBrands}
                error={errors.brands?.[index]?.id}
              />
            ))}
          </div>
          <Button
            type="button"
            className="min-w-44 max-w-1/3 mt-4 mb-2"
            severity="secondary"
            outlined
            label={translate('form.actions.addBrand')}
            onClick={() => append({ id: '' })}
            loading={isLoadingBrands}
            disabled={activeBrands && watchBrandIds.length >= activeBrands.length}
          />
        </div>
      
      </form>
    </FormModal>
  )
}

export default EditLocationList

