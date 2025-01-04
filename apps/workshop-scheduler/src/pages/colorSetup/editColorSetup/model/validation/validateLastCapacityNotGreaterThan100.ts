import { AvailabilityColorToValidate } from './types'

export const validateLastCapacityNotGreaterThan100 = (availabilityColors: AvailabilityColorToValidate[]) => {
  const lastCapacityValue = availabilityColors[availabilityColors.length - 1].capacityValueWithoutPercentages.trim()
  const lastCapacityNumberValue = parseInt(lastCapacityValue.substring(1))

  return lastCapacityNumberValue <= 100
}
