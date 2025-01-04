import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { LocationCounterEntity } from '../model/types'
import {
  api,
  GetLocationCounterQuery,
  UpdateLocationCounterReceptionIntervalMutation,
} from './LocationCounter.generated'

type LocationCounterApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocationCounter', 'UpdateLocationCounterReceptionInterval'],
  {
    GetLocationCounter: LocationCounterEntity
    UpdateLocationCounterReceptionInterval: UpdateLocationCounterReceptionIntervalMutation
  }
>

type TagTypes = LocationCounterApi['TagTypes']
type ApiEndpointDefinitions = LocationCounterApi['ApiEndpointDefinitions']

const LOCATION_COUNTER_TAG = 'LOCATION_COUNTER'

export const locationCounterApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_COUNTER_TAG],
  endpoints: {
    UpdateLocationCounterReceptionInterval: {
      invalidatesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_COUNTER_TAG)(result, error, arg.locationId)
      },
    },
    GetLocationCounter: {
      transformResponse: (response: GetLocationCounterQuery) => response.getLocationCounter,
      providesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_COUNTER_TAG)(result, error, arg.locationId)
      },
    },
  },
})

export const { useGetLocationCounterQuery, useUpdateLocationCounterReceptionIntervalMutation } = locationCounterApi
