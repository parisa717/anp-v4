import { GqlGetLocationWorksObjectType, GqlGetWorkshopLocationWorkObjectType } from '@/shared/api/types.generated'

export type ListLocationWorkItemEntity = GqlGetLocationWorksObjectType['locationWorks'][number]
export type LocationWorkEntity = GqlGetWorkshopLocationWorkObjectType
