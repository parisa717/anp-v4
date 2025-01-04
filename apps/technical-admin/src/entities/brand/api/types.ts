import { GqlBrandObjectType as GeneratedApiType } from '@/shared/api/types.generated'

import { GetBrandQuery, GetBrandsQuery } from './Brand.generated'

export type BrandDTO = GeneratedApiType
export type QueryBrands = GetBrandsQuery['getBrands']['brands']
export type QueryBrand = GetBrandQuery['getBrand']
