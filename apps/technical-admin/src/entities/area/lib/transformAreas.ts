import { QueryAreas } from '../api/types'
import { type AreaEntity } from '../model/types'

const filterArea = (area: AreaEntity | null): area is AreaEntity => area !== null

export const transformAreas = (areas: QueryAreas) => {
  return areas?.filter(filterArea) ?? []
}
