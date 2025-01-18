import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformWorks, transformWorkshopWorkLocationWorks } from '../lib/transformWorks'
import { PaginatedWorkEntities, WorkEntity, WorkshopWorkLocationWorkEntity } from '../model/types'
import {
  ActivateWorkshopWorkMutation,
  api,
  CreateWorkshopWorkMutation,
  DeactivateWorkshopWorkMutation,
  GetWorkshopWorkLocationWorksQuery,
  GetWorkshopWorkQuery,
  GetWorkshopWorksQuery,
  SetWorkshopWorkLocationWorksMutation,
  UpdateWorkshopWorkMutation,
} from './Work.generated'

type WorkApi = ApiWithTransformResponse<
  typeof api,
  [
    'CreateWorkshopWork',
    'GetWorkshopWorks',
    'GetWorkshopWork',
    'DeactivateWorkshopWork',
    'ActivateWorkshopWork',
    'UpdateWorkshopWork',
    'SetWorkshopWorkLocationWorks',
    'GetWorkshopWorkLocationWorks',
  ],
  {
    CreateWorkshopWork: CreateWorkshopWorkMutation
    GetWorkshopWorks: PaginatedWorkEntities
    GetWorkshopWork: WorkEntity
    DeactivateWorkshopWork: DeactivateWorkshopWorkMutation
    ActivateWorkshopWork: ActivateWorkshopWorkMutation
    UpdateWorkshopWork: UpdateWorkshopWorkMutation
    SetWorkshopWorkLocationWorks: SetWorkshopWorkLocationWorksMutation
    GetWorkshopWorkLocationWorks: WorkshopWorkLocationWorkEntity[]
  }
>
type TagTypes = WorkApi['TagTypes']
type ApiEndpointDefinitions = WorkApi['ApiEndpointDefinitions']

const WORK_TAG = 'WORK'

export const workApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, WORK_TAG],
  endpoints: {
    DeactivateWorkshopWork: {
      invalidatesTags: cacher.cacheByIdArgProperty(WORK_TAG),
    },
    ActivateWorkshopWork: {
      invalidatesTags: cacher.cacheByIdArgProperty(WORK_TAG),
    },
    CreateWorkshopWork: {
      invalidatesTags: cacher.invalidatesList(WORK_TAG),
    },
    GetWorkshopWorks: {
      transformResponse: (response: GetWorkshopWorksQuery) => ({
        works: transformWorks(response.getWorkshopWorks),
        metadata: response.getWorkshopWorks.metadata,
      }),
      providesTags: (response, error) => cacher.providesList(WORK_TAG)(response?.works, error),
    },
    GetWorkshopWork: {
      transformResponse: (response: GetWorkshopWorkQuery) => response.getWorkshopWork,
      providesTags: cacher.cacheByIdArgProperty(WORK_TAG),
    },
    UpdateWorkshopWork: {
      invalidatesTags: (result, error, arg) => cacher.cacheByIdArgProperty(WORK_TAG)(result, error, arg.workshopWork),
    },
    GetWorkshopWorkLocationWorks: {
      transformResponse: (response: GetWorkshopWorkLocationWorksQuery) =>
        transformWorkshopWorkLocationWorks(response.getWorkshopWorkLocationWorks),
      providesTags: cacher.cacheByIdArgProperty(WORK_TAG),
    },
    SetWorkshopWorkLocationWorks: {
      invalidatesTags: cacher.cacheByIdArgProperty(WORK_TAG),
    },
  },
})

export const {
  useCreateWorkshopWorkMutation,
  useGetWorkshopWorkQuery,
  useGetWorkshopWorksQuery,
  useActivateWorkshopWorkMutation,
  useDeactivateWorkshopWorkMutation,
  useUpdateWorkshopWorkMutation,
  useGetWorkshopWorkLocationWorksQuery,
  useSetWorkshopWorkLocationWorksMutation,
} = workApi
