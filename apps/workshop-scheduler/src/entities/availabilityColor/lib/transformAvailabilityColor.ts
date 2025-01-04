import { QueryAvailabilityColors } from '../api/types'
import { type AvailabilityColorEntity } from '../model/types'
import { getCapacityValue } from './getCapacityValue'

const filterAvailabilityColor = (
  availabilityColor: AvailabilityColorEntity | null,
): availabilityColor is AvailabilityColorEntity => availabilityColor !== null

export const transformAvailabilityColors = (availabilityColors: QueryAvailabilityColors) => {
  return (
    availabilityColors?.availabilityColors
      .map((availabilityColor) => ({
        ...availabilityColor,
        capacityValue: getCapacityValue(availabilityColor),
      }))
      .filter(filterAvailabilityColor) ?? []
  )
}
