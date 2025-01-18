export enum AreaErrorCode {
  AREA_ALREADY_EXISTS = 1725371680,
  AREA_NOT_FOUND = 1725371686,
  AREA_COULD_NOT_BE_ACTIVATED = 1727689259,
  AREA_COUNTRY_DOES_NOT_EXIST = 1725371698,
}

export const AREA_ERROR_CODE_TO_MESSAGE_KEY = {
  [AreaErrorCode.AREA_ALREADY_EXISTS]: 'serverSideErrors.areas.alreadyExists',
  [AreaErrorCode.AREA_NOT_FOUND]: 'serverSideErrors.areas.notFound',
  [AreaErrorCode.AREA_COULD_NOT_BE_ACTIVATED]: 'serverSideErrors.areas.couldNotBeActivated',
  [AreaErrorCode.AREA_COUNTRY_DOES_NOT_EXIST]: 'serverSideErrors.areas.countryDoesNotExists',
}
