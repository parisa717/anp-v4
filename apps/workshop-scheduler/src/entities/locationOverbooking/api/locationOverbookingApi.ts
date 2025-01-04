import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformLocationOverbooking } from '../lib/transformLocationOverbooking'
import { LocationOverbookingEntity } from '../model/types'
import {
  api,
  GetLocationOverbookingQuery,
  UpdateLocationMinimalOverbookingMutation,
  UpdateLocationOverbookingMutation,
} from './LocationOverbooking.generated'

type LocationOverbookingApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocationOverbooking', 'UpdateLocationOverbooking'],
  {
    GetLocationOverbooking: LocationOverbookingEntity
    UpdateLocationOverbooking: UpdateLocationOverbookingMutation
    UpdateLocationMinimalOverbooking: UpdateLocationMinimalOverbookingMutation
  }
>

type TagTypes = LocationOverbookingApi['TagTypes']
type ApiEndpointDefinitions = LocationOverbookingApi['ApiEndpointDefinitions']

const LOCATION_OVERBOOKING_TAG = 'LOCATION_OVERBOOKING'

export const locationOverbookingApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_OVERBOOKING_TAG],
  endpoints: {
    GetLocationOverbooking: {
      transformResponse: (response: GetLocationOverbookingQuery) =>
        transformLocationOverbooking(response.getLocationOverbooking),
      providesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_OVERBOOKING_TAG)(result, error, arg.locationId)
      },
    },
    UpdateLocationOverbooking: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(LOCATION_OVERBOOKING_TAG)(result, error, arg.locationId),
    },
    UpdateLocationMinimalOverbooking: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(LOCATION_OVERBOOKING_TAG)(result, error, arg.locationId),
    },
  },
})

export const {
  useGetLocationOverbookingQuery,
  useUpdateLocationOverbookingMutation,
  useUpdateLocationMinimalOverbookingMutation,
} = locationOverbookingApi
