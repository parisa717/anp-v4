import { AvailabilityColorToValidate } from './types'

export const validateNoGapsBetweenCapacities = (
  availabilityColors: AvailabilityColorToValidate[],
): { isValid: boolean; gapPairs: number[][] } => {
  const pairsWithGaps: number[][] = []

  /**
   *  Check all availability colours pairs except the last item
   *  The last item has a different format
   */
  for (let i = 0; i < availabilityColors.length - 2; i++) {
    const currentCapacity = availabilityColors[i].capacityValueWithoutPercentages.trim()
    const nextCapacity = availabilityColors[i + 1].capacityValueWithoutPercentages.trim()

    /**
     * For example, in the case of currentCapacity === [0-10] and nextCapacity === [20-30]:
     *
     * currentCapacityEnd variable will be 10
     * nextCapacityStart variable will be 10
     */
    const [_, currentCapacityEnd] = currentCapacity.split('-').map(Number)
    const [nextCapacityStart] = nextCapacity.split('-').map(Number)

    /**
     * For the above example we can see that currentCapacityEnd + 1 !== nextCapacityStart
     * So, we have a gap between 0-10 and 20-30
     */
    if (currentCapacityEnd + 1 !== nextCapacityStart) {
      pairsWithGaps.push([i, i + 1])
    }
  }

  return {
    isValid: pairsWithGaps.length === 0,
    gapPairs: pairsWithGaps,
  }
}
