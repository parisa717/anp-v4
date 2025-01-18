import { ApiWithTransformResponse, cacher } from '@nexus-ui/utils'

import { transformLocations } from '../lib/transformLocations'
import { LocationEntity } from '../model/types'
import { api, GetLocationsQuery } from './Location.generated'

type LocationApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocations'],
  {
    GetLocations: LocationEntity[]
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
  },
})

export const { useCreateLocationMutation, useGetLocationsQuery } = locationApi
