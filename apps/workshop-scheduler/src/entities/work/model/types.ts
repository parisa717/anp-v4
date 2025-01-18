import {
  GqlGetWorkshopWorkLocationWorksLocationWorkObjectType,
  GqlGetWorkshopWorksObjectType,
  PaginationAndSortingMetadata,
} from '@/shared/api/types.generated'

export type WorkEntity = GqlGetWorkshopWorksObjectType['works'][number]
export type PaginatedWorkEntities = { works: WorkEntity[]; metadata: PaginationAndSortingMetadata }
export type WorkshopWorkLocationWorkEntity = GqlGetWorkshopWorkLocationWorksLocationWorkObjectType
