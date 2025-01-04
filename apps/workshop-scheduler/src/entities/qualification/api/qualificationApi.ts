import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformQualifications } from '../lib/transformQualifications'
import { QualificationEntity } from '../model/types'
import { api, GetQualificationsQuery } from './Qualification.generated'

type QualificationApi = ApiWithTransformResponse<
  typeof api,
  ['GetQualifications'],
  {
    GetQualifications: QualificationEntity[]
  }
>
type TagTypes = QualificationApi['TagTypes']
type ApiEndpointDefinitions = QualificationApi['ApiEndpointDefinitions']

const QUALIFICATION_TAG = 'QUALIFICATION'

export const qualificationApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, QUALIFICATION_TAG],
  endpoints: {
    GetQualifications: {
      transformResponse: (response: GetQualificationsQuery) => transformQualifications(response.getQualifications),
      providesTags: cacher.providesList(QUALIFICATION_TAG),
    },
  },
})

export const { useGetQualificationsQuery } = qualificationApi
