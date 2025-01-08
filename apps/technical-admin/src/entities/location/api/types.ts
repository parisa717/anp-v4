import { GqlGetLocationObjectType as GeneratedLocationType } from '@/shared/api/types.generated'

import { GetLocationsQuery } from './Location.generated'

export type LocationDTO = GeneratedLocationType
export type QueryLocations = GetLocationsQuery['getLocations']
