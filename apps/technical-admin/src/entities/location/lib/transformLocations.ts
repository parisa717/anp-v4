import { QueryLocations } from '../api/types'
import { type LocationEntity } from '../model/types'

const filterLocations = (location: LocationEntity | null): location is LocationEntity => location !== null

export const transformLocations = (locations: QueryLocations) => {
  return locations?.locations.filter(filterLocations) ?? []
}
