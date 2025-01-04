import { AvailabilityColorToValidate } from './types'

export const validateFirstCapacityStartsWithZero = (availabilityColors: AvailabilityColorToValidate[]) => {
  return availabilityColors[0].capacityValueWithoutPercentages.trim().startsWith('0')
}
