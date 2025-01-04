import { QueryLocations, QueryWorkshopConnectedLocations } from '../api/types'
import { type LocationEntity, type WorkshopConnectedLocationsEntity } from '../model/types'

const filterWorkshopConnectedLocations = (
  workshopConnectedLocation: WorkshopConnectedLocationsEntity | null,
): workshopConnectedLocation is WorkshopConnectedLocationsEntity => workshopConnectedLocation !== null

const filterLocations = (location: LocationEntity | null): location is LocationEntity => location !== null

export const transformLocations = (locations: QueryLocations) => {
  return locations?.locations.filter(filterLocations) ?? []
}

export const transformWorkshopConnectedLocations = (locations: QueryWorkshopConnectedLocations) => {
  return locations?.workshopConnectedLocations.filter(filterWorkshopConnectedLocations) ?? []
}
