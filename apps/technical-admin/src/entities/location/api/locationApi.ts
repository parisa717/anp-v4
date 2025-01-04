import type { ApiWithTransformResponse ,cacher} from '@nexus-ui/utils'

import { api, GetLocationQuery, GetLocationsQuery } from './Location.generated'
import { LocationEntity } from '../model/types'

type LocationApi = ApiWithTransformResponse<typeof api,['GetLocations', 'GetLocation'],  {
  GetLocations: LocationEntity[],
  GetLocation: LocationEntity 
}>
type TagTypes = LocationApi['TagTypes']
type ApiEndpointDefinitions = LocationApi['ApiEndpointDefinitions']

const LOCATION_TAG = 'LOCATION'

export const locationApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetLocation: {
      transformResponse: (response: GetLocationQuery) => response.getLocation as LocationEntity,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_TAG),
    },

  },

})

export const { useCreateLocationMutation,useGetLocationQuery } = locationApi
