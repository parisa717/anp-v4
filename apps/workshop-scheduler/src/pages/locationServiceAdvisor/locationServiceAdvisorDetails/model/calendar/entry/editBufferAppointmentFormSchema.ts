import { TFunction } from 'i18next'
import { z } from 'zod'

export const getEditBufferAppointmentFormSchema = (t: TFunction) => {
  const translate = (key: string) => t(`pages.locationServiceAdvisor.details.bufferAppointments.edit.validation.${key}`)
  return z
    .object({
      date: z.date(),
      startTime: z.date(),
      endTime: z.date(),
      isPeriodic: z.boolean(),
      periodicEnd: z.date().nullable(),
    })
    .refine((data) => !data.isPeriodic || data.periodicEnd != null, {
      message: t('validation.required'),
      path: ['periodicEnd'],
    })
    .refine((data) => !data.isPeriodic || (data.periodicEnd && data.periodicEnd > data.date), {
      message: translate('invalidPeriodicDate'),
      path: ['periodicEnd'],
    })
    .refine((data) => data.endTime > data.startTime, {
      message: translate('invalidEndTime'),
      path: ['endTime'],
    })
}

export type EditBufferAppointmentFormSchema = z.infer<ReturnType<typeof getEditBufferAppointmentFormSchema>>

export const editBufferAppointmentFormSchemaInitValues = {
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  isPeriodic: false,
  periodicEnd: null,
}
