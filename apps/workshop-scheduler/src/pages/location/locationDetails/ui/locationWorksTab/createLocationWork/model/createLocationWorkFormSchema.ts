import { TFunction } from 'i18next'
import { z } from 'zod'

export const getCreateLocationWorkFormSchema = (t: TFunction) =>
  z.object({
    works: z.array(
      z.object({
        isRecommended: z.boolean(),
        amountPerDayLimit: z.number().int().positive(t('validation.positiveNumber')).finite().nullable(),
        capacityPerDayLimit: z.number().positive(t('validation.positiveNumber')).finite().nullable(),
        selectedBrands: z.array(z.string()).min(1, t('validation.required')),
        id: z.string().min(1, t('validation.required')),
      }),
    ),
  })

export type CreateLocationWorkFormSchema = z.infer<ReturnType<typeof getCreateLocationWorkFormSchema>>

export const createLocationWorkFormSchemaInitValues = {
  amountPerDayLimit: null,
  selectedBrands: [],
  capacityPerDayLimit: null,
  isRecommended: false,
  id: '',
}
