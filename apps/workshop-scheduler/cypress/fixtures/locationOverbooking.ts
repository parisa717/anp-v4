export const MINIMUM_OVERBOOKING_MULTIPLIER = 1.1
export const CAPACITY_OVERBOOKING_MULTIPLIER = 1.5
export const MAX_CAPACITY_MULTIPLIER = 1.8
export const GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE = {
  getLocationOverbooking: {
    locationOverbooking: {
      minimumOverbookingMultiplier: MINIMUM_OVERBOOKING_MULTIPLIER,
      capacityOverbookingMultiplier: CAPACITY_OVERBOOKING_MULTIPLIER,
      maxCapacityMultiplier: MAX_CAPACITY_MULTIPLIER,
    },
  },
}
