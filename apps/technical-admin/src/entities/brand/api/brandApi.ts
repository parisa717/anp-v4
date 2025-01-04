import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformBrand } from '../lib/transformBrand'
import { transformBrands } from '../lib/transformBrands'
import { type BrandEntity } from '../model/types'
import { api, CreateBrandMutation, GetBrandQuery, GetBrandsQuery, UpdateBrandMutation } from './Brand.generated'

type BrandApi = ApiWithTransformResponse<
  typeof api,
  ['GetBrands', 'GetBrand'],
  {
    GetBrands: BrandEntity[]
    GetBrand: BrandEntity | null
    UpdateBrand: UpdateBrandMutation
    CreateBrand: CreateBrandMutation
  }
>
type TagTypes = BrandApi['TagTypes']
type ApiEndpointDefinitions = BrandApi['ApiEndpointDefinitions']

const BRAND_TAG = 'BRAND'

export const brandApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  endpoints: {
    GetBrands: {
      transformResponse: (response: GetBrandsQuery) => transformBrands(response.getBrands.brands),
      providesTags: cacher.providesList(BRAND_TAG),
    },
    GetBrand: {
      transformResponse: (response: GetBrandQuery) => transformBrand(response.getBrand),
      providesTags: cacher.cacheByIdArgProperty(BRAND_TAG),
    },
    UpdateBrand: {
      invalidatesTags: (result, error, arg) => cacher.cacheByIdArgProperty(BRAND_TAG)(result, error, arg.brand),
    },
    CreateBrand: {
      invalidatesTags: cacher.invalidatesList(BRAND_TAG),
    },
  },
})

export const { useCreateBrandMutation, useUpdateBrandMutation, useGetBrandQuery, useGetBrandsQuery } = brandApi
