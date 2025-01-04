import { TFunction } from 'i18next'
import { z } from 'zod'

export const getEditLocationWorkFormSchema = (t: TFunction) =>
  z.object({
    isRecommended: z.boolean(),
    amountPerDayLimit: z.number().int().positive(t('validation.positiveNumber')).finite().nullable(),
    capacityPerDayLimit: z.number().positive(t('validation.positiveNumber')).finite().nullable(),
    brands: z.array(z.string()).min(1, t('validation.required')),
  })

export type EditLocationWorkFormSchema = z.infer<ReturnType<typeof getEditLocationWorkFormSchema>>

export const editLocationWorkFormSchemaInitValues = {
  amountPerDayLimit: null,
  brands: [],
  capacityPerDayLimit: null,
  isRecommended: false,
}
