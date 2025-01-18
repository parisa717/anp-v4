import { QueryWorks, QueryWorkshopWorkLocationWorks } from '../api/types'
import { type WorkEntity, WorkshopWorkLocationWorkEntity } from '../model/types'

const filterWorks = (work: WorkEntity | null): work is WorkEntity => work !== null

export const transformWorks = (works: QueryWorks) => {
  return works?.works.filter(filterWorks) ?? []
}

const filterWorkshopWorkLocationWorks = (
  locationWorks: WorkshopWorkLocationWorkEntity | null,
): locationWorks is WorkshopWorkLocationWorkEntity => locationWorks !== null

export const transformWorkshopWorkLocationWorks = (locationWorks: QueryWorkshopWorkLocationWorks) => {
  return locationWorks?.locationWorks.filter(filterWorkshopWorkLocationWorks) ?? []
}
