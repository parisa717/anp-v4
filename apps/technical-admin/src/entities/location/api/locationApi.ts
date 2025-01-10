import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { LocationEntity } from '../model/types'
import { api, GetLocationQuery } from './Location.generated'

type LocationApi = ApiWithTransformResponse<typeof api,['GetLocation'],  {
  GetLocation: LocationEntity 
}>
type TagTypes = LocationApi['TagTypes']
type ApiEndpointDefinitions = LocationApi['ApiEndpointDefinitions']

const LOCATION_TAG = 'LOCATION'

export const locationApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetLocation: {
      transformResponse: (response: GetLocationQuery) => response.getLocation,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_TAG),
    },
   

  },

})

export const { useCreateLocationMutation,useGetLocationQuery,useUpdateLocationMutation } = locationApi
