import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { LocationCounterCalendarEntity } from '../model/types'
import {
  api,
  GetLocationCounterCalendarQuery,
  UpdateLocationCounterCalendarMutation,
} from './LocationCounterCalendar.generated'

type LocationCounterCalendarApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocationCounterCalendar', 'UpdateLocationCounterCalendar'],
  {
    GetLocationCounterCalendar: LocationCounterCalendarEntity
    UpdateLocationCounterCalendar: UpdateLocationCounterCalendarMutation
  }
>

type TagTypes = LocationCounterCalendarApi['TagTypes']
type ApiEndpointDefinitions = LocationCounterCalendarApi['ApiEndpointDefinitions']

const LOCATION_COUNTER_CALENDAR_TAG = 'LOCATION_COUNTER_CALENDAR'

export const locationCounterApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_COUNTER_CALENDAR_TAG],
  endpoints: {
    UpdateLocationCounterCalendar: {
      invalidatesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_COUNTER_CALENDAR_TAG)(result, error, arg.locationId)
      },
    },
    GetLocationCounterCalendar: {
      transformResponse: (response: GetLocationCounterCalendarQuery) => response.getLocationCounterCalendar,
      providesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_COUNTER_CALENDAR_TAG)(result, error, arg.locationId)
      },
    },
  },
})

export const { useGetLocationCounterCalendarQuery, useUpdateLocationCounterCalendarMutation } = locationCounterApi
