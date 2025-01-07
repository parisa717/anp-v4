import { TFunction } from 'i18next'
import { z } from 'zod'

import { AreaStatus } from '@/entities/area'

const EditCountryInputSchema = (t: TFunction) =>
  z.object({
    id: z.string().min(1, t('validation.required')),
  })

const EditAddressInputSchema = (t: TFunction) =>
  z.object({
    country: EditCountryInputSchema(t),
    postCode: z.string().min(1, t('validation.required')),
    city: z.string().min(1, t('validation.required')),
    address: z.string().min(1, t('validation.required')),
  })

export const EditAreaFormSchema = (t: TFunction) =>
  z.object({
    code: z.string().min(3, t('validation.required')),
    name: z.string().min(1, t('validation.required')),
    address: EditAddressInputSchema(t),
    status: z.nativeEnum(AreaStatus, { message: t('validation.required') }),
  })

export type EditAreaFormSchema = z.infer<ReturnType<typeof EditAreaFormSchema>>
