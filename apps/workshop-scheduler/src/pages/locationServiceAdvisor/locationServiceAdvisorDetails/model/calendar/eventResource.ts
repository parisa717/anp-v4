import { CalendarEntryPeriodEnum, CalendarEntryTypeEnum } from '@/shared/api/types.generated'

export interface EventResource {
  id: string
  startTime: string | null
  endTime: string | null
  eventTypeName: string | null
  eventType: CalendarEntryTypeEnum
  periodicEnd: string | null
  period: CalendarEntryPeriodEnum
}
