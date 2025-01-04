import { GetAreaQuery, GetAreasQuery } from '../api/Area.generated'

export type GqlAreaObjectTypeEntity = GetAreaQuery['getArea']
export type AreaEntity = GetAreasQuery['getAreas']['areas'][number]

export enum AreaStatus {
  Active = 'active',
  Inactive = 'inactive',
}
