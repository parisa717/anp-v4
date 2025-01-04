import { GqlGetLocationCounterCalendarObjectType } from '@/shared/api/types.generated'

export type LocationCounterCalendarEntity = GqlGetLocationCounterCalendarObjectType
export type LocationCounterCalendarWorkDayEntity = GqlGetLocationCounterCalendarObjectType['workDays'][number]
