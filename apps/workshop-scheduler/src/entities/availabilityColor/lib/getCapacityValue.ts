import { GqlGetAvailabilityColorObjectType } from '@/shared/api/types.generated'

export const getCapacityValue = (availabilityColor: GqlGetAvailabilityColorObjectType) => {
  if (!availabilityColor.maximalCapacity) {
    return `>${availabilityColor.minimalCapacity}%`
  }

  return `${availabilityColor.minimalCapacity}%-${availabilityColor.maximalCapacity}%`
}
