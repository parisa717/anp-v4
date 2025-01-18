export enum LocationOverbookingErrorCode {
  LOCATION_OVERBOOKING_MULTIPLIER_BELOW_MINIMUM = 1730110922,
  LOCATION_OVERBOOKING_LOCATION_NOT_FOUND = 1725438536,
  LOCATION_OVERBOOKING_OVERBOOKING_FOR_LOCATION_NOT_FOUND = 1732284381,
}

export const LOCATION_OVERBOOKING_ERROR_CODE_TO_MESSAGE_KEY = {
  [LocationOverbookingErrorCode.LOCATION_OVERBOOKING_MULTIPLIER_BELOW_MINIMUM]:
    'serverSideErrors.locationOverbookings.multiplierBelowMinimum',
  [LocationOverbookingErrorCode.LOCATION_OVERBOOKING_LOCATION_NOT_FOUND]:
    'serverSideErrors.locationOverbookings.locationNotFound',
  [LocationOverbookingErrorCode.LOCATION_OVERBOOKING_OVERBOOKING_FOR_LOCATION_NOT_FOUND]:
    'serverSideErrors.locationOverbookings.overbookingForLocationNotFound',
}
