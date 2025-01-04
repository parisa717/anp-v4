import { useTranslation } from '@nexus-ui/i18n'
import { InputTextFormField, SelectBoxFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form'

import { useGetBrandsQuery } from '@/entities/brand'

import { DefaultBrand } from '../model/consts'
import { WorkSetupFormSchema } from '../model/formSchema'
import { TimeUnitsModal } from './TimeUnitsModal'

interface BrandsSectionProps {
  control: Control<WorkSetupFormSchema>
  errors: FieldErrors<WorkSetupFormSchema>
  setValue: UseFormSetValue<WorkSetupFormSchema>
}

export const BrandsSection = ({ control, errors, setValue }: BrandsSectionProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.workSetupForm.${key}`)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {
    data: brands,
    isLoading: isLoadingBrands,
    isError: isBrandsError,
  } = useGetBrandsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.filter((brand) => brand.isActive).map((brand) => ({ value: brand.id, label: brand.name })),
    }),
  })

  const workBrands = useWatch({ control, name: 'brands' })
  const unselectedBrands = brands?.filter((brand) => !workBrands?.map((wb) => wb.id).includes(brand.value))
  const areAllBrandsAdded = unselectedBrands?.length === 0

  if (isBrandsError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const updateBrands = (updatedBrands: WorkSetupFormSchema['brands']) => {
    setValue('brands', updatedBrands)
  }

  const handleAddBrand = () => {
    updateBrands([...workBrands, DefaultBrand])
  }

  const handleRemoveBrand = (index: number) => {
    updateBrands(workBrands.filter((_, i) => i !== index))
  }

  const handleAddAllBrands = (timeUnits: number, shouldOverwriteAll: boolean) => {
    const remainingBrands =
      unselectedBrands?.map((brand) => ({
        id: brand.value,
        timeUnits,
      })) || []

    const filteredWorkBrands = workBrands.filter((brand) => brand.id !== '')

    const updatedBrands = shouldOverwriteAll
      ? filteredWorkBrands?.map((brand) => ({ ...brand, timeUnits }))
      : filteredWorkBrands

    updateBrands([...updatedBrands, ...remainingBrands])
    setIsModalVisible(false)
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {workBrands?.map((_, brandIndex) => (
          <div key={brandIndex} className="flex gap-2 mb-3 items-start">
            <div className="flex-1 min-w-0">
              <SelectBoxFormField
                name={`brands.${brandIndex}.id`}
                label={translate('brand')}
                options={brands?.map((brand) => ({
                  disabled: !unselectedBrands?.some((ub) => ub.value === brand.value),
                  ...brand,
                }))}
                hasFloatLabel
                loading={isLoadingBrands}
                control={control}
                className={{ input: 'w-full', container: 'flex-grow' }}
                error={errors.brands?.[brandIndex]?.id}
              />
            </div>
            <div className="flex-1 min-w-0">
              <InputTextFormField
                type="number"
                name={`brands.${brandIndex}.timeUnits`}
                label={translate('timeUnits')}
                hasFloatLabel
                control={control}
                error={errors.brands?.[brandIndex]?.timeUnits}
                className={{
                  input: 'w-full',
                  container: 'flex-1 min-w-0',
                }}
              />
            </div>
            {workBrands.length > 1 && (
              <Button
                data-cy="remove-brand-button"
                type="button"
                outlined
                severity="secondary"
                icon="pi pi-trash"
                onClick={() => handleRemoveBrand(brandIndex)}
              />
            )}
          </div>
        ))}
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            severity="secondary"
            outlined
            label={translate('addBrandButton')}
            disabled={areAllBrandsAdded}
            onClick={handleAddBrand}
            className="flex-1"
          />
          <Button
            type="button"
            severity="secondary"
            outlined
            label={translate('addAllBrandsButton')}
            disabled={areAllBrandsAdded}
            onClick={() => setIsModalVisible(true)}
            className="flex-1"
          />
        </div>
      </div>
      <TimeUnitsModal
        isVisible={isModalVisible}
        onCancelClick={() => setIsModalVisible(false)}
        onSaveClick={handleAddAllBrands}
      />
    </>
  )
}
