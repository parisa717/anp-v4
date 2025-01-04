import { GqlGetBrandsObjectType as GeneratedBrandType } from '@/shared/api/types.generated'

import { GetBrandsQuery } from './Brand.generated'

export type BrandDTO = GeneratedBrandType['brands'][number]
export type QueryBrands = GetBrandsQuery['getBrands']['brands']
