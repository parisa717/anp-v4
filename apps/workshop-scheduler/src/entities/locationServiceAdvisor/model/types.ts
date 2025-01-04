import {
  GqlGetServiceAdvisorCalendarCalendarEntriesObjectType,
  GqlGetServiceAdvisorCalendarObjectType,
  GqlGetServiceAdvisorObjectType,
} from '@/shared/api/types.generated'

export type ServiceAdvisorCalendar = Omit<GqlGetServiceAdvisorCalendarObjectType, '__typename'>
export type ServiceAdvisorEntity = Omit<GqlGetServiceAdvisorObjectType, '__typename'>
export type ServiceAdvisorCalendarEntry = Omit<GqlGetServiceAdvisorCalendarCalendarEntriesObjectType, '__typename'>
