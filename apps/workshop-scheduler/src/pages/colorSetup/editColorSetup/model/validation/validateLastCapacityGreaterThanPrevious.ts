import { AvailabilityColorToValidate } from './types'

export const validateLastCapacityGreaterThanPrevious = (availabilityColors: AvailabilityColorToValidate[]) => {
  /**
   * For example, in the case of previousCapacity === [71-90] and lastCapacity === [100]:
   *
   * The function will return false, because the lastCapacity should be equal to ">90" in this case
   */

  const previousCapacityValue = availabilityColors[availabilityColors.length - 2].capacityValueWithoutPercentages.trim()
  const lastCapacityValue = availabilityColors[availabilityColors.length - 1].capacityValueWithoutPercentages.trim()

  const previousCapacityUpperBoundValue = parseInt(previousCapacityValue.split('-')[1])
  const lastCapacityNumberValue = parseInt(lastCapacityValue.substring(1))

  return lastCapacityNumberValue === previousCapacityUpperBoundValue
}
