import {
  GqlGetLocationTeamsCalendarDayCapacityObjectType,
  GqlGetLocationTeamsCalendarObjectType,
  GqlGetTeamCapacityObjectType,
} from '@/shared/api/types.generated'

export type LocationTeamsCalendarEntity = GqlGetLocationTeamsCalendarObjectType['locationTeamsCalendar']
export type TeamCapacityEntity = GqlGetTeamCapacityObjectType
export type LocationTeamsCalendarDayCapacity = GqlGetLocationTeamsCalendarDayCapacityObjectType
