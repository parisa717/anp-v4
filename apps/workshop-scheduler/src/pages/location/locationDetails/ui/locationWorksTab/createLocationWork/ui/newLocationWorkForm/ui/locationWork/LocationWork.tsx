import { useTranslation } from '@nexus-ui/i18n'
import { CheckboxFormField, InputNumberFormField } from '@nexus-ui/ui'
import clsx from 'clsx'
import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Divider } from 'primereact/divider'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'

import { useGetLocationQuery } from '@/entities/location'
import { useGetWorkshopWorksQuery } from '@/entities/work'
import { IdParam } from '@/shared/lib'

import { CreateLocationWorkFormSchema } from '../../../../model/createLocationWorkFormSchema'

type Props = {
  field: CreateLocationWorkFormSchema['works'][number]
  idx: number
  isRemovingDisabled: boolean
  onRemove: VoidFunction
}

export const LocationWork = ({ field, idx, isRemovingDisabled, onRemove }: Props) => {
  const { t } = useTranslation()
  const { id = '' } = useParams<IdParam>()
  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.create.${key}`)

  const [workNameSearch, setWorkNameSearch] = useState<string>('')
  const [workName, setWorkName] = useState<string>('')
  const [workBrands, setWorkBrands] = useState<{ id: string; name: string }[]>([])
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateLocationWorkFormSchema>()

  const { data: locationDetails, isError: isLocationDetailsError } = useGetLocationQuery({ id })

  const {
    data: workshopWorks,
    isError: isWorkshopWorksError,
    refetch: refetchWorkshopWorks,
  } = useGetWorkshopWorksQuery({
    filter: {
      excludeServicesAssignedToTheLocation: id,
      brand: locationDetails?.brands.map((brand) => brand.id),
      name: workNameSearch,
    },
    pagination: {
      limit: 4, //TODO: change to max 100 when use GW
      offset: 0,
    },
  })

  const watchWorks = useWatch({ control, name: 'works' })

  //TODO: Add proper error handling
  if (isLocationDetailsError || isWorkshopWorksError) return <div>Error...</div>

  const selectedWorkIds = watchWorks.map((work) => work?.id)
  const workshopWorkOptions = workshopWorks?.works.filter((work) => !selectedWorkIds.includes(work.id)) ?? []

  const locationBrandIds = locationDetails?.brands.map((brand) => brand.id) ?? []
  const brandOptions = workBrands.filter((brand) => locationBrandIds.includes(brand.id)) ?? []

  const fieldErrors = errors.works?.[idx]
  const hasAnyLimitErrors = fieldErrors?.amountPerDayLimit || fieldErrors?.capacityPerDayLimit

  return (
    <>
      <div>
        <AutoComplete
          value={workName}
          suggestions={workshopWorkOptions}
          completeMethod={(e) => {
            setWorkNameSearch(e.query)
          }}
          className="w-full"
          onSelect={(e) => {
            setWorkName(e.value.name)
            setWorkBrands(e.value.brands)
            setValue(`works.${idx}.id`, e.value.id, { shouldDirty: true, shouldValidate: true })
            setValue(`works.${idx}.selectedBrands`, [])
          }}
          field="name"
          delay={500}
          emptyMessage={translate('table.empty')}
          showEmptyMessage
          dropdown
          forceSelection
          onDropdownClick={() => {
            refetchWorkshopWorks()
          }}
          onChange={(e) => {
            if (typeof e.value === 'string') {
              const isRenamingWorkName = field.id !== '' && workName.length !== e.value.length
              if (isRenamingWorkName) {
                setWorkName('')
                setWorkBrands([])
                setValue(`works.${idx}.id`, '')
                setValue(`works.${idx}.selectedBrands`, [])
              } else {
                setWorkName(e.value)
              }
            }
          }}
        />
        {fieldErrors?.id?.message && <p className="text-error mt-2">{fieldErrors.id.message}</p>}
      </div>
      <div>
        {brandOptions.map((brand) => (
          <label className="flex gap-2 items-center my-2" key={brand.id}>
            <Checkbox
              value={brand.id}
              checked={field.selectedBrands.includes(brand.id)}
              onChange={(e) => {
                const updatedBrands = e.checked
                  ? [...field.selectedBrands, e.value]
                  : field.selectedBrands?.filter((brandId) => brandId !== e.value)
                setValue(`works.${idx}.selectedBrands`, updatedBrands, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }}
            />
            {brand.name}
          </label>
        ))}
        {fieldErrors?.selectedBrands?.message && brandOptions.length > 0 && (
          <p className="text-error mt-0">{fieldErrors.selectedBrands.message}</p>
        )}
      </div>
      <div className="flex justify-between items-start mt-8">
        <div className={clsx('flex gap-4 w-[84%]', hasAnyLimitErrors ? 'items-start' : 'items-center')}>
          <InputNumberFormField
            control={control}
            name={`works.${idx}.capacityPerDayLimit`}
            label={translate('capacityPerDayLimit')}
            hasFloatLabel
            suffix="%"
            size={16}
            error={fieldErrors?.capacityPerDayLimit}
            disabled={field.amountPerDayLimit !== null}
            className={{ error: 'max-w-56' }}
          />
          <InputNumberFormField
            control={control}
            name={`works.${idx}.amountPerDayLimit`}
            label={translate('amountPerDayLimit')}
            hasFloatLabel
            size={16}
            error={fieldErrors?.amountPerDayLimit}
            disabled={field.capacityPerDayLimit !== null}
            className={{ error: 'max-w-56' }}
          />
          <CheckboxFormField
            control={control}
            name={`works.${idx}.isRecommended`}
            label={translate(`isRecommended`)}
            className={{ container: clsx(hasAnyLimitErrors && 'mt-2') }}
          />
        </div>
        <Button
          disabled={isRemovingDisabled}
          icon="pi pi-trash"
          type="button"
          severity="secondary"
          onClick={onRemove}
          outlined
        />
      </div>
      <Divider />
    </>
  )
}
