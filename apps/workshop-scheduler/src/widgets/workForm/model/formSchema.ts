import { TFunction } from 'i18next'
import { z } from 'zod'

export const workSetupFormSchema = (t: TFunction) =>
  z.object({
    id: z.string(),
    name: z.string().min(3, t('validation.required')),
    qualificationId: z.string().min(1, t('validation.required')),
    isActive: z.boolean(),
    isDescriptionEditable: z.boolean(),
    isCapacityEditable: z.boolean(),
    brands: z.array(
      z.object({
        id: z.string().min(1, t('validation.required')),
        timeUnits: z.coerce.number().positive({
          message: t('validation.positiveNumber'),
        }),
      }),
    ),
  })

export type WorkSetupFormSchema = z.infer<ReturnType<typeof workSetupFormSchema>>
