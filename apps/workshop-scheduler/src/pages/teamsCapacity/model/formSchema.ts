import { TFunction } from 'i18next'
import { z } from 'zod'

export const createCapacityFormSchema = (t: TFunction) =>
  z.object({
    capacity: z
      .number({ invalid_type_error: t('validation.required') })
      .positive(t('validation.positiveNumber'))
      .finite(),
  })

export type CapacityFormType = z.infer<ReturnType<typeof createCapacityFormSchema>>
