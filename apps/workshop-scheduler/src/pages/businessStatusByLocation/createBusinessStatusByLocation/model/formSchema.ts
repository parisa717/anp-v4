import { TFunction } from 'i18next'
import { z } from 'zod'

export const createBusinessStatusFormByLocationSchema = (t: TFunction) =>
  z.object({
    businessStatuses: z.array(
      z.object({
        id: z.string().min(1, t('validation.required')),
      }),
    ),
  })

export type CreateBusinessStatusByLocationFormSchema = z.infer<
  ReturnType<typeof createBusinessStatusFormByLocationSchema>
>
