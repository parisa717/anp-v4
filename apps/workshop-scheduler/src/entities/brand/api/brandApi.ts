import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformBrands } from '../lib/transformBrands'
import { BrandEntity } from '../model/types'
import { api, GetBrandsQuery } from './Brand.generated'

type BrandApi = ApiWithTransformResponse<
  typeof api,
  ['GetBrands'],
  {
    GetBrands: BrandEntity[]
  }
>
type TagTypes = BrandApi['TagTypes']
type ApiEndpointDefinitions = BrandApi['ApiEndpointDefinitions']

const BRAND_TAG = 'BRAND'

export const brandApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, BRAND_TAG],
  endpoints: {
    GetBrands: {
      transformResponse: (response: GetBrandsQuery) => transformBrands(response.getBrands.brands),
      providesTags: cacher.providesList(BRAND_TAG),
    },
  },
})

export const { useGetBrandsQuery } = brandApi
