import { QueryLocationOverbooking } from '../api/types'
import { type LocationOverbookingEntity } from '../model/types'

export const transformLocationOverbooking = (
  locationOverbooking: QueryLocationOverbooking,
): LocationOverbookingEntity => {
  return {
    capacityOverbookingMultiplier: locationOverbooking.locationOverbooking.capacityOverbookingMultiplier,
    maxCapacityMultiplier: locationOverbooking.locationOverbooking.maxCapacityMultiplier,
    minimumOverbookingMultiplier: locationOverbooking.locationOverbooking.minimumOverbookingMultiplier,
  }
}
