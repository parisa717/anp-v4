import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { SliderWithInputFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'

import { getLocationOverbookingFormSchema, type LocationOverbookingForm } from '../../model/formSchema'

interface LocationOverbookingEditFormProps {
  defaultValue: number
  minValue: number
  maxValue: number
  onCancel: () => void
  onSubmit: (data: LocationOverbookingForm) => Promise<void>
  isLoading?: boolean
}

export const LocationOverbookingEditForm = ({
  minValue,
  maxValue,
  defaultValue,
  onCancel,
  onSubmit,
  isLoading = false,
}: LocationOverbookingEditFormProps) => {
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<LocationOverbookingForm>({
    resolver: zodResolver(getLocationOverbookingFormSchema({ t, minValue, maxValue })),
    defaultValues: { capacityOverbooking: defaultValue },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4" data-cy="capacity-overbooking-edit-form">
      <div className="flex flex-1 gap-3 items-start">
        <p data-cy="min-capacity-overbooking" className="relative top-9 m-0">
          {minValue}%
        </p>
        <SliderWithInputFormField<LocationOverbookingForm>
          name="capacityOverbooking"
          control={control}
          maxValue={maxValue}
          minValue={minValue}
        />
        <p data-cy="max-capacity-overbooking" className="relative top-9 m-0">
          {maxValue}%
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          data-cy="cancel-button"
          icon="pi pi-times"
          type="button"
          severity="secondary"
          onClick={onCancel}
          outlined
        />
        <Button
          icon="pi pi-check"
          type="submit"
          outlined
          loading={isLoading}
          data-cy="location-overbooking-edit-submit-button"
        />
      </div>
    </form>
  )
}
