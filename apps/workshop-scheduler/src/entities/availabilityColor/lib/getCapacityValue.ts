import { GqlAvailabilityColorObjectType } from '@/shared/api/types.generated'

export const getCapacityValue = (availabilityColor: GqlAvailabilityColorObjectType) => {
  if (!availabilityColor.maximumCapacity) {
    return `>${availabilityColor.minimalCapacity}%`
  }

  return `${availabilityColor.minimalCapacity}%-${availabilityColor.maximumCapacity}%`
}
