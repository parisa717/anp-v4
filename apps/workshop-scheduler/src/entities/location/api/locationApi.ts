import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformLocations, transformWorkshopConnectedLocations } from '../lib/transformLocations'
import { LocationEntity, WorkshopConnectedLocationsEntity } from '../model/types'
import {
  api,
  CreateWorkshopConnectedLocationsMutation,
  DeleteWorkshopConnectedLocationsMutation,
  GetLocationQuery,
  GetLocationsQuery,
  GetWorkshopConnectedLocationsQuery,
} from './Location.generated'

type LocationApi = ApiWithTransformResponse<
  typeof api,
  [
    'CreateWorkshopConnectedLocations',
    'DeleteWorkshopConnectedLocations',
    'GetLocations',
    'GetLocation',
    'GetWorkshopConnectedLocations',
  ],
  {
    CreateWorkshopConnectedLocations: CreateWorkshopConnectedLocationsMutation
    DeleteWorkshopConnectedLocations: DeleteWorkshopConnectedLocationsMutation
    GetLocations: LocationEntity[]
    GetLocation: LocationEntity
    GetWorkshopConnectedLocations: WorkshopConnectedLocationsEntity[]
  }
>
type TagTypes = LocationApi['TagTypes']
type ApiEndpointDefinitions = LocationApi['ApiEndpointDefinitions']

const LOCATION_TAG = 'LOCATION'

export const locationApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_TAG],
  endpoints: {
    CreateWorkshopConnectedLocations: {
      invalidatesTags: (result, error, arg) => {
        return [
          ...cacher.cacheByIdArg(LOCATION_TAG)(result, error, arg.connectedLocationId),
          ...cacher.cacheByIdArg(LOCATION_TAG)(result, error, arg.locationId),
        ]
      },
    },
    DeleteWorkshopConnectedLocations: {
      invalidatesTags: (result, error, arg) => {
        return [
          ...cacher.cacheByIdArg(LOCATION_TAG)(result, error, arg.connectedLocationId),
          ...cacher.cacheByIdArg(LOCATION_TAG)(result, error, arg.locationId),
        ]
      },
    },
    GetLocations: {
      transformResponse: (response: GetLocationsQuery) => transformLocations(response.getLocations),
      providesTags: cacher.providesList(LOCATION_TAG),
    },
    GetLocation: {
      transformResponse: (response: GetLocationQuery) => response.getLocation,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_TAG),
    },
    GetWorkshopConnectedLocations: {
      transformResponse: (response: GetWorkshopConnectedLocationsQuery) => {
        return transformWorkshopConnectedLocations(response.getWorkshopConnectedLocations)
      },
      providesTags: (result, error, arg) => {
        return [
          ...cacher.providesListWithCustomId(LOCATION_TAG, 'connectedLocationId')(result, error),
          ...cacher.cacheByIdArg(LOCATION_TAG)(result, error, arg.locationId),
        ]
      },
    },
  },
})

export const {
  useCreateWorkshopConnectedLocationsMutation,
  useDeleteWorkshopConnectedLocationsMutation,
  useGetLocationsQuery,
  useGetLocationQuery,
  useGetWorkshopConnectedLocationsQuery,
} = locationApi
