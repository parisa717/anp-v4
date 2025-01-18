import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { CheckboxFormField, FormModal, InputNumberFormField } from '@nexus-ui/ui'
import clsx from 'clsx'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'

import { useGetLocationQuery } from '@/entities/location'
import { EditLocationWorkParams, useGetLocationWorkQuery, useUpdateLocationWorkMutation } from '@/entities/locationWork'
import { useGetWorkshopWorkQuery } from '@/entities/work'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import {
  EditLocationWorkFormSchema,
  editLocationWorkFormSchemaInitValues,
  getEditLocationWorkFormSchema,
} from '../model/editLocationWorkFormSchema'

const EditLocationWorkPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id: locationId = '', locationWorkId = '' } = useParams<EditLocationWorkParams>()

  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.edit.${key}`)

  const [updateLocationWork, { isLoading: isUpdateLocationWorkLoading }] = useUpdateLocationWorkMutation()
  const {
    data: locationWorkDetails,
    isLoading: isLocationWorkDetailsLoading,
    isSuccess: isLocationWorDetailsSuccess,
  } = useGetLocationWorkQuery({ id: locationWorkId })

  const {
    data: locationDetails,
    isLoading: isLocationDetailsLoading,
    isSuccess: isLocationDetailsSuccess,
  } = useGetLocationQuery({ id: locationId })

  const { data: workDetails, isSuccess: isWorkDetailsSuccess } = useGetWorkshopWorkQuery(
    {
      id: locationWorkDetails?.workId ?? '',
    },
    {
      skip: !locationWorkDetails?.workId,
    },
  )

  const values = {
    amountPerDayLimit: locationWorkDetails?.amountPerDayLimit ?? null,
    brands: locationWorkDetails?.brands?.map((brand) => brand?.id ?? '') ?? [],
    capacityPerDayLimit: locationWorkDetails?.capacityPerDayLimit
      ? locationWorkDetails.capacityPerDayLimit * 100
      : null,
    isRecommended: locationWorkDetails?.isRecommended ?? false,
  }

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditLocationWorkFormSchema>({
    values,
    defaultValues: editLocationWorkFormSchemaInitValues,
    resolver: zodResolver(getEditLocationWorkFormSchema(t)),
  })

  if (!isLocationDetailsSuccess || !isLocationWorDetailsSuccess || !isWorkDetailsSuccess) return null

  const handleCancelClick = () => {
    navigate(pageUrls.location.details.root(locationId))
  }

  const handleSubmitForm = async (data: EditLocationWorkFormSchema) => {
    const result = await updateLocationWork({
      workshopLocationWork: {
        brands: data.brands.map((brandId) => ({ id: brandId })),
        id: locationWorkId,
        workId: locationWorkDetails.workId,
        locationId,
        isRecommended: data.isRecommended,
        amountPerDayLimit: data.amountPerDayLimit,
        capacityPerDayLimit: data.capacityPerDayLimit !== null ? data.capacityPerDayLimit / 100 : null,
      },
    })

    if (result.data && !result.error) {
      navigate(pageUrls.location.details.root(locationId))
    }
  }

  const availableBrandsForLocation = workDetails.brands.filter((workBrand) =>
    locationDetails.brands.map((brand) => brand.id).includes(workBrand.id),
  )

  const selectedBrands = watch('brands')
  const amountPerDayLimit = watch('amountPerDayLimit')
  const capacityPerDayLimit = watch('capacityPerDayLimit')
  const hasAnyLimitErrors = errors?.amountPerDayLimit || errors?.capacityPerDayLimit

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      onSaveClick={handleSubmit(handleSubmitForm)}
      width="36%"
      minWidth={695}
      title={translate(`title`)}
      isUpdating={isUpdateLocationWorkLoading}
      isLoading={isLocationWorkDetailsLoading || isLocationDetailsLoading}
    >
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.Location.Details.LocationWorks.Edit} className="mb-8" />
      <p className="text-lg text-bluegray-500 my-0 mx-0">{translate('nameLabel')}</p>
      <p className="text-xl text-bluegray-700 font-bold mt-0 mb-3 mx-0">{locationWorkDetails.name}</p>
      <div>
        {availableBrandsForLocation.map((brand) => (
          <label className="flex gap-2 items-center my-2" key={brand.id}>
            <Checkbox
              value={brand.id}
              checked={selectedBrands.includes(brand.id)}
              onChange={(e) => {
                const updatedBrands = e.checked
                  ? [...selectedBrands, e.value]
                  : selectedBrands.filter((brandId) => brandId !== e.value)
                setValue(`brands`, updatedBrands, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }}
            />
            {brand.name}
          </label>
        ))}
        {errors?.brands?.message && <p className="text-error mt-0">{errors.brands.message}</p>}
      </div>
      <div className="flex justify-between items-start mt-8">
        <div className={clsx('flex gap-4 w-[84%]', hasAnyLimitErrors ? 'items-start' : 'items-center')}>
          <InputNumberFormField
            control={control}
            name={`capacityPerDayLimit`}
            label={translate('capacityPerDayLimit')}
            hasFloatLabel
            suffix="%"
            size={16}
            error={errors?.capacityPerDayLimit}
            disabled={amountPerDayLimit !== null}
            className={{ error: 'max-w-56' }}
          />
          <InputNumberFormField
            control={control}
            name={`amountPerDayLimit`}
            label={translate('amountPerDayLimit')}
            hasFloatLabel
            size={16}
            error={errors?.amountPerDayLimit}
            disabled={capacityPerDayLimit !== null}
            className={{ error: 'max-w-56' }}
          />
          <CheckboxFormField
            control={control}
            name={`isRecommended`}
            label={translate(`isRecommended`)}
            className={{ container: clsx(hasAnyLimitErrors && 'mt-2') }}
          />
        </div>
        <Link to={pageUrls.location.details.locationWorks.remove(locationId, locationWorkId)}>
          <Button icon="pi pi-trash" type="button" severity="secondary" outlined link />
        </Link>
      </div>
    </FormModal>
  )
}

export default EditLocationWorkPage
