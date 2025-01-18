import { TFunction } from 'i18next'
import { z } from 'zod'

export const searchCustomerAndVehicleFormSchema = (t: TFunction) =>
  z
    .object({
      customerName: z.string(),
      customerBirthDate: z
        .date({
          invalid_type_error: t('validation.dateValid'),
        })
        .or(z.string()),
      customerPhone: z.string(),
      vehicleLicencePlate: z.string(),
      vehicleVin: z.string(),
    })
    .partial()
    .refine(
      (data) =>
        data.customerName ||
        data.customerBirthDate ||
        data.customerPhone ||
        data.vehicleLicencePlate ||
        data.vehicleVin,
    )

export type CustomerAndVehicleFormType = z.infer<ReturnType<typeof searchCustomerAndVehicleFormSchema>>
