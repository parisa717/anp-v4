import { TFunction } from 'i18next'
import { z } from 'zod'

export const unselectDefaultBusinessStatusFormSchema = (t: TFunction) =>
  z.object({
    defaultBusinessStatusId: z.string().min(1, t('validation.required')),
  })

export type UnselectDefaultBusinessStatusFormSchema = z.infer<
  ReturnType<typeof unselectDefaultBusinessStatusFormSchema>
>
