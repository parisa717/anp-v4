import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformAreas } from '../lib/transformAreas'
import { type AreaEntity, type GqlAreaObjectTypeEntity } from '../model/types'
import { api, GetAreaQuery, GetAreasQuery } from './Area.generated'

type AreaApi = ApiWithTransformResponse<
  typeof api,
  ['GetAreas', 'GetArea'],
  { GetAreas: AreaEntity[]; GetArea: GqlAreaObjectTypeEntity }
>

type TagTypes = AreaApi['TagTypes']
type ApiEndpointDefinitions = AreaApi['ApiEndpointDefinitions']

const AREA_TAG = 'Area'

export const areaApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetAreas: {
      transformResponse: (response: GetAreasQuery) => transformAreas(response.getAreas.areas),
      providesTags: cacher.providesList(AREA_TAG),
    },
    CreateArea: {
      invalidatesTags: cacher.invalidatesList(AREA_TAG),
    },
    UpdateArea: {
      invalidatesTags: cacher.invalidatesList(AREA_TAG),
    },
    GetArea: {
      transformResponse: (response: GetAreaQuery) => response.getArea,
      providesTags: cacher.cacheByIdArgProperty(AREA_TAG),
    },
  },
})

export const { useGetAreasQuery, useCreateAreaMutation, useGetAreaQuery , useUpdateAreaMutation} = areaApi
