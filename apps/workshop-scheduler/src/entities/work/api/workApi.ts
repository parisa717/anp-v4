import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformWorks } from '../lib/transformWorks'
import { PaginatedWorkEntities, WorkEntity } from '../model/types'
import {
  ActivateWorkshopWorkMutation,
  api,
  CreateWorkshopWorkMutation,
  DeactivateWorkshopWorkMutation,
  GetWorkshopWorkQuery,
  GetWorkshopWorksQuery,
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
  ],
  {
    CreateWorkshopWork: CreateWorkshopWorkMutation
    GetWorkshopWorks: PaginatedWorkEntities
    GetWorkshopWork: WorkEntity
    DeactivateWorkshopWork: DeactivateWorkshopWorkMutation
    ActivateWorkshopWork: ActivateWorkshopWorkMutation
    UpdateWorkshopWork: UpdateWorkshopWorkMutation
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
  },
})

export const {
  useCreateWorkshopWorkMutation,
  useGetWorkshopWorkQuery,
  useGetWorkshopWorksQuery,
  useActivateWorkshopWorkMutation,
  useDeactivateWorkshopWorkMutation,
  useUpdateWorkshopWorkMutation,
} = workApi
