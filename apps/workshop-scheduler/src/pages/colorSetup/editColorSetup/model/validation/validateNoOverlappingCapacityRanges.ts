import { AvailabilityColorToValidate } from './types'

export const validateNoOverlappingCapacityRanges = (
  availabilityColors: AvailabilityColorToValidate[],
): { isValid: boolean; overlappingPairs: number[][] } => {
  const overlappingPairs: number[][] = []

  /**
   *  Check all availability colours pairs except the last item
   *  The last item has a different format
   */
  for (let i = 0; i < availabilityColors.length - 2; i++) {
    const currentCapacity = availabilityColors[i].capacityValueWithoutPercentages.trim()
    const nextCapacity = availabilityColors[i + 1].capacityValueWithoutPercentages.trim()

    /**
     * For example, in the case of currentCapacity === [0-10] and nextCapacity === [10-20]:
     *
     * currentCapacityEnd variable will be 10
     * nextCapacityStart variable will be 10
     */
    const [_, currentCapacityEnd] = currentCapacity.split('-').map(Number)
    const [nextCapacityStart] = nextCapacity.split('-').map(Number)

    /**
     * For the above example we can see that currentCapacityEnd === nextCapacityStart
     * So, we have an overlapping pair
     */
    if (currentCapacityEnd === nextCapacityStart) {
      overlappingPairs.push([i, i + 1])
    }
  }

  return {
    isValid: overlappingPairs.length === 0,
    overlappingPairs,
  }
}
