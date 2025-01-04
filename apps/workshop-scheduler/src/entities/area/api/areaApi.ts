import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { AreaEntity } from '../model/types'
import { api, GetAreaQuery } from './Area.generated'

type AreaApi = ApiWithTransformResponse<
  typeof api,
  ['GetArea'],
  {
    GetArea: AreaEntity
  }
>
type TagTypes = AreaApi['TagTypes']
type ApiEndpointDefinitions = AreaApi['ApiEndpointDefinitions']

const AREA_TAG = 'AREA_STATUS'

export const areaApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, AREA_TAG],
  endpoints: {
    GetArea: {
      transformResponse: (response: GetAreaQuery) => response.getArea,
      providesTags: cacher.cacheByIdArgProperty(AREA_TAG),
    },
  },
})

export const { useGetAreaQuery } = areaApi
