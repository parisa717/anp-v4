import { TFunction } from 'i18next'
import { z } from 'zod'

export const workSetupFormSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(3, t('validation.required')),
    qualificationId: z.string().min(1, t('validation.required')),
    isActive: z.boolean(),
    isDescriptionEditable: z.boolean(),
    isCapacityEditable: z.boolean(),
    brands: z.array(
      z.object({
        id: z.string().min(1, t('validation.required')),
        timeUnits: z.union([z.string(), z.number()]).refine(
          (value) => {
            const transformedValue = typeof value === 'string' ? parseInt(value) : value
            return transformedValue > 0
          },
          {
            message: t('validation.positiveNumber'),
          },
        ),
      }),
    ),
  })

export type WorkSetupFormSchema = z.infer<ReturnType<typeof workSetupFormSchema>>
