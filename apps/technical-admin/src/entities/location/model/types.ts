import { GqlGetLocationObjectType } from '@/shared/api/types.generated'

import { GetLocationQuery } from '../api/Location.generated'

export type LocationEntity = GqlGetLocationObjectType
export type LocationEntityFromQuery = GetLocationQuery['getLocation']
