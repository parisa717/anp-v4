import { TFunction } from 'i18next'
import { z } from 'zod'

export const followUpWorkFormSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(3, t('validation.required')),
    qualificationId: z.string().min(1, t('validation.required')),
    timeUnits: z.coerce.number().positive({
      message: t('validation.positiveNumber'),
    }),
    isActive: z.boolean(),
    isDescriptionEditable: z.boolean(),
    isCapacityEditable: z.boolean(),
  })

export type FollowUpWorkFormSchema = z.infer<ReturnType<typeof followUpWorkFormSchema>>
