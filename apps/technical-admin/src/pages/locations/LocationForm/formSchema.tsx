import { TFunction } from 'i18next'
import { z } from 'zod'

//TODO: replace string with uuid validation when the gateway is ready
export const FormSchemas = (t: TFunction) =>
  z.object({
    area: z.string().min(1, t('validation.required')),
    code: z.string().min(1, t('validation.required')),
    name: z.string().min(1, t('validation.required')),
    zipCode: z.string().min(1, t('validation.required')),
    city: z.string().min(1, t('validation.required')),
    address: z.string().min(1, t('validation.required')),
    country: z.string().min(1, t('validation.required')),
    isActive: z.boolean(),
    copyNameFromArea: z.boolean().optional(),
    brands: z
      .array(
        z.object({
          id: z
            .string({
              message: t('validation.required'),
            })
            .min(1, t('validation.required')),
        }),
      )
      .min(1, t('validation.required')),
  })

export type FormSchemas = z.infer<ReturnType<typeof FormSchemas>>