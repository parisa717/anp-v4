import { TFunction } from 'i18next'
import { z } from 'zod'

import { BrandStatus } from '@/entities/brand'

export const createBrandFormSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(2, t('validation.required'))
      .max(20, t('validation.maxLength', { length: 20 })),
    status: z.nativeEnum(BrandStatus, { message: t('validation.required') }),
  })

export type CreateBrandFormSchema = z.infer<ReturnType<typeof createBrandFormSchema>>
