import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformWorks } from '../lib/transformFollowUpWorks'
import { FollowUpWorkEntity } from '../model/types'
import {
  api,
  CreateWorkshopFollowUpWorkMutation,
  GetWorkshopFollowUpWorkQuery,
  GetWorkshopFollowUpWorksQuery,
  UpdateWorkshopFollowUpWorkMutation,
} from './FollowUpWork.generated'

type FollowUpWorkApi = ApiWithTransformResponse<
  typeof api,
  ['CreateWorkshopFollowUpWork', 'UpdateWorkshopFollowUpWork', 'GetWorkshopFollowUpWorks', 'GetWorkshopFollowUpWork'],
  {
    CreateWorkshopFollowUpWork: CreateWorkshopFollowUpWorkMutation
    UpdateWorkshopFollowUpWork: UpdateWorkshopFollowUpWorkMutation
    GetWorkshopFollowUpWorks: FollowUpWorkEntity[]
    GetWorkshopFollowUpWork: FollowUpWorkEntity
  }
>

type TagTypes = FollowUpWorkApi['TagTypes']
type ApiEndpointDefinitions = FollowUpWorkApi['ApiEndpointDefinitions']

const FOLLOWUP_WORK_TAG = 'FOLLOWUP_WORK'

export const followUpWorkApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, FOLLOWUP_WORK_TAG],
  endpoints: {
    CreateWorkshopFollowUpWork: {
      invalidatesTags: cacher.invalidatesList(FOLLOWUP_WORK_TAG),
    },
    GetWorkshopFollowUpWorks: {
      transformResponse: (response: GetWorkshopFollowUpWorksQuery) => transformWorks(response.getWorkshopFollowUpWorks),
      providesTags: cacher.providesList(FOLLOWUP_WORK_TAG),
    },
    GetWorkshopFollowUpWork: {
      transformResponse: (response: GetWorkshopFollowUpWorkQuery) => response.getWorkshopFollowUpWork,
      providesTags: cacher.cacheByIdArgProperty(FOLLOWUP_WORK_TAG),
    },
    UpdateWorkshopFollowUpWork: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArgProperty(FOLLOWUP_WORK_TAG)(result, error, arg.workshopFollowUpWork),
    },
  },
})

export const {
  useCreateWorkshopFollowUpWorkMutation,
  useUpdateWorkshopFollowUpWorkMutation,
  useGetWorkshopFollowUpWorksQuery,
  useGetWorkshopFollowUpWorkQuery,
} = followUpWorkApi
