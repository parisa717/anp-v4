import { ApiWithTransformResponse, cacher } from '@nexus-ui/utils'

import { transformLocations } from '../lib/transformLocations'
import { LocationEntity, LocationEntityFromQuery } from '../model/types'
import { api, GetLocationQuery,GetLocationsQuery } from './Location.generated'

type LocationApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocations','GetLocation'],
  {
    GetLocations: LocationEntity[],
    GetLocation: LocationEntityFromQuery 
  }
>

type TagTypes = LocationApi['TagTypes']
type ApiEndpointDefinitions = LocationApi['ApiEndpointDefinitions']

const LOCATION_TAG = 'LOCATION'

export const locationApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetLocations: {
      transformResponse: (response: GetLocationsQuery) => transformLocations(response.getLocations),
      providesTags: cacher.providesList(LOCATION_TAG),
    },
    GetLocation: {
      transformResponse: (response: GetLocationQuery) => response.getLocation,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_TAG),
    },
  },
})

export const { useCreateLocationMutation, useGetLocationsQuery,useGetLocationQuery,useUpdateLocationMutation } = locationApi
