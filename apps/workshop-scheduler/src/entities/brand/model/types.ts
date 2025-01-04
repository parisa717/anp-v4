import { GqlGetBrandsObjectType } from '@/shared/api/types.generated'

export type BrandEntity = GqlGetBrandsObjectType['brands'][number] & {
  name: string
}
