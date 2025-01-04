export enum LocationErrorCode {
  LOCATION_ALREADY_EXISTS = 1725438531,
  LOCATION_NOT_FOUND = 1725438536,
  LOCATION_BRAND_CAN_NOT_BE_DEASSIGNED = 1725446650,
  LOCATION_BRAND_CAN_NOT_BE_ASSIGNED = 1725446647,
  LOCATION_COUNTRY_DOES_NOT_EXIST = 1725371698,
  LOCATION_COULD_NOT_BE_ACTIVATED = 1727689445,
  LOCATION_BRAND_IS_NOT_ASSIGNED = 1730120794,
}

export const LOCATION_ERROR_CODE_TO_MESSAGE_KEY = {
  [LocationErrorCode.LOCATION_ALREADY_EXISTS]: 'serverSideErrors.locations.alreadyExists',
  [LocationErrorCode.LOCATION_NOT_FOUND]: 'serverSideErrors.locations.notFound',
  [LocationErrorCode.LOCATION_BRAND_CAN_NOT_BE_DEASSIGNED]: 'serverSideErrors.locations.brandCannotBeDeassigned',
  [LocationErrorCode.LOCATION_BRAND_CAN_NOT_BE_ASSIGNED]: 'serverSideErrors.locations.brandCannotBeAssigned',
  [LocationErrorCode.LOCATION_COUNTRY_DOES_NOT_EXIST]: 'serverSideErrors.locations.countryDoesNotExists',
  [LocationErrorCode.LOCATION_COULD_NOT_BE_ACTIVATED]: 'serverSideErrors.locations.couldNotBeActivated',
  [LocationErrorCode.LOCATION_BRAND_IS_NOT_ASSIGNED]: 'serverSideErrors.locations.brandIsNotAssigned',
}
