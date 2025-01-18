import {
  GqlGetWorkshopLocationWorkObjectType,
  GqlGetWorkshopLocationWorksObjectType,
} from '@/shared/api/types.generated'

export type ListLocationWorkItemEntity = GqlGetWorkshopLocationWorksObjectType['locationWorks'][number]
export type LocationWorkEntity = GqlGetWorkshopLocationWorkObjectType
