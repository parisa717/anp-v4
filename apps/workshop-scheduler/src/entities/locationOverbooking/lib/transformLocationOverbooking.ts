import { QueryLocationOverbooking } from '../api/types'
import { type LocationOverbookingEntity } from '../model/types'

export const transformLocationOverbooking = (
  locationOverbooking: QueryLocationOverbooking,
): LocationOverbookingEntity => {
  return {
    capacityOverbookingMultiplier: locationOverbooking.capacityOverbookingMultiplier,
    maxCapacityMultiplier: locationOverbooking.maxCapacityMultiplier,
    minimumOverbookingMultiplier: locationOverbooking.minimumOverbookingMultiplier,
  }
}
