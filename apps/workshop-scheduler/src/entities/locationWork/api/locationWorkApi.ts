import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { ListLocationWorkItemEntity, LocationWorkEntity } from '../model/types'
import {
  api,
  CreateLocationWorkMutation,
  DeleteLocationWorkMutation,
  GetLocationWorkQuery,
  GetLocationWorksQuery,
  UpdateLocationWorkMutation,
} from './LocationWork.generated'

type LocationWorkApi = ApiWithTransformResponse<
  typeof api,
  ['CreateLocationWork', 'GetLocationWorks', 'UpdateLocationWork', 'DeleteLocationWork', 'GetLocationWork'],
  {
    CreateLocationWork: CreateLocationWorkMutation
    GetLocationWorks: ListLocationWorkItemEntity[]
    UpdateLocationWork: UpdateLocationWorkMutation
    DeleteLocationWork: DeleteLocationWorkMutation
    GetLocationWork: LocationWorkEntity
  }
>

type TagTypes = LocationWorkApi['TagTypes']
type ApiEndpointDefinitions = LocationWorkApi['ApiEndpointDefinitions']

const LOCATION_WORK_TAG = 'LOCATION_WORK'

export const locationWorkApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_WORK_TAG],
  endpoints: {
    CreateLocationWork: {
      invalidatesTags: cacher.invalidatesList(LOCATION_WORK_TAG),
    },
    GetLocationWorks: {
      transformResponse: (response: GetLocationWorksQuery) => response.getLocationWorks.locationWorks,
      providesTags: cacher.providesList(LOCATION_WORK_TAG),
    },
    UpdateLocationWork: {
      invalidatesTags: (result, error, arg) => {
        return cacher.cacheByIdArg(LOCATION_WORK_TAG)(result, error, arg.locationWork.id)
      },
    },
    DeleteLocationWork: {
      invalidatesTags: cacher.cacheByIdArgProperty(LOCATION_WORK_TAG),
    },
    GetLocationWork: {
      transformResponse: (response: GetLocationWorkQuery) => response.getWorkshopLocationWork,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_WORK_TAG),
    },
  },
})

export const {
  useCreateLocationWorkMutation,
  useGetLocationWorksQuery,
  useGetLocationWorkQuery,
  useDeleteLocationWorkMutation,
  useUpdateLocationWorkMutation,
} = locationWorkApi
