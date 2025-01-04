import { TFunction } from 'i18next'
import { z } from 'zod'

import { AreaStatus } from '@/entities/area'

const createCountryInputSchema = (t: TFunction) =>
  z.object({
    id: z.string().min(1, t('validation.required')),
  })

const createAddressInputSchema = (t: TFunction) =>
  z.object({
    country: createCountryInputSchema(t),
    postCode: z.string().min(1, t('validation.required')),
    city: z.string().min(1, t('validation.required')),
    address: z.string().min(1, t('validation.required')),
  })

export const createAreaFormSchema = (t: TFunction) =>
  z.object({
    code: z.string().min(3, t('validation.required')),
    name: z.string().min(1, t('validation.required')),
    address: createAddressInputSchema(t),
    status: z.nativeEnum(AreaStatus, { message: t('validation.required') }),
  })

export type CreateAreaFormSchema = z.infer<ReturnType<typeof createAreaFormSchema>>
