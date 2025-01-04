import { GetBusinessStatusesByLocationQuery, GetBusinessStatusesQuery } from './BusinessStatus.generated'

export type QueryBusinessStatuses = GetBusinessStatusesQuery['getWorkshopAppointmentBusinessStatuses']
export type QueryBusinessStatusesByLocation =
  GetBusinessStatusesByLocationQuery['getLocationWorkshopAppointmentBusinessStatuses']
