import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { LocationTeamsCalendarEntity, TeamCapacityEntity } from '../model/types'
import {
  api,
  GetLocationTeamsCalendarQuery,
  GetTeamCapacityQuery,
  UpdateTeamCapacityMutation,
} from './TeamsCapacity.generated'

type LocationCounterCalendarApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocationTeamsCalendar', 'GetTeamCapacity', 'UpdateTeamCapacity'],
  {
    GetLocationTeamsCalendar: LocationTeamsCalendarEntity
    GetTeamCapacity: TeamCapacityEntity
    UpdateTeamCapacity: UpdateTeamCapacityMutation
  }
>

type TagTypes = LocationCounterCalendarApi['TagTypes']
type ApiEndpointDefinitions = LocationCounterCalendarApi['ApiEndpointDefinitions']

const TEAMS_CAPACITY_TAG = 'TEAMS_CAPACITY'

export const teamsCapacityApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, TEAMS_CAPACITY_TAG],
  endpoints: {
    UpdateTeamCapacity: {
      invalidatesTags: cacher.cacheByIdArgProperty(TEAMS_CAPACITY_TAG),
    },
    GetLocationTeamsCalendar: {
      transformResponse: (response: GetLocationTeamsCalendarQuery) => response.getLocationTeamsCalendar,
      providesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(TEAMS_CAPACITY_TAG)(result, error, arg.id)
      },
    },
    GetTeamCapacity: {
      transformResponse: (response: GetTeamCapacityQuery) => response.getTeamCapacity,
      providesTags: cacher.cacheByIdArgProperty(TEAMS_CAPACITY_TAG),
    },
  },
})

export const { useGetLocationTeamsCalendarQuery, useGetTeamCapacityQuery, useUpdateTeamCapacityMutation } =
  teamsCapacityApi
