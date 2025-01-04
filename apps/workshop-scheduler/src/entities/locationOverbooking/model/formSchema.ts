import { TFunction } from 'i18next'
import { z } from 'zod'

interface GetLocationOverbookingFormSchemaProps {
  t: TFunction
  minValue: number
  maxValue: number
}

export const getLocationOverbookingFormSchema = ({ t, minValue, maxValue }: GetLocationOverbookingFormSchemaProps) =>
  z.object({
    capacityOverbooking: z
      .number({ invalid_type_error: t('validation.required') })
      .positive(t('validation.positiveNumber'))
      .multipleOf(5, t('validation.multipleOfFive'))
      .min(minValue, t('validation.minimumNumber', { minValue }))
      .max(maxValue, t('validation.maximumNumber', { maxValue })),
  })

export type LocationOverbookingForm = z.infer<ReturnType<typeof getLocationOverbookingFormSchema>>
