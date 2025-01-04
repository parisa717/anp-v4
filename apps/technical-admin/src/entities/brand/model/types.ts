import { GqlBrandObjectType } from '@/shared/api/types.generated'

export type BrandEntity = Omit<GqlBrandObjectType, '__typename'> & {
  name: string
}

export enum BrandStatus {
  Active = 'active',
  Inactive = 'inactive',
}
