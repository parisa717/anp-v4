export enum AdditionalBusinessStatusErrorCode {
  ADDITIONAL_BUSINESS_STATUS_EXISTS = 1727359611,
  ADDITIONAL_BUSINESS_STATUS_ONLY_ONE_COULD_BE_MARKED_AS_DEFAULT = 1727359613,
  ADDITIONAL_BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE = 1727359615,
  ADDITIONAL_BUSINESS_STATUS_DEFAULT_CANNOT_BE_UNASSIGNED = 1727359622,
  ADDITIONAL_BUSINESS_STATUS_INACTIVE_CANNOT_BE_DEFAULT = 1729239555,
  ADDITIONAL_BUSINESS_STATUS_NOT_FOUND = 1727361605,
}

export const ADDITIONAL_BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY = {
  [AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_EXISTS]:
    'serverSideErrors.additionalBusinessStatuses.statusExists',
  [AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_ONLY_ONE_COULD_BE_MARKED_AS_DEFAULT]:
    'serverSideErrors.additionalBusinessStatuses.onlyOneCouldBeMarkedAsDefault',
  [AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE]:
    'serverSideErrors.additionalBusinessStatuses.atLeastOneActive',
  [AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_DEFAULT_CANNOT_BE_UNASSIGNED]:
    'serverSideErrors.additionalBusinessStatuses.defaultCannotBeUnassigned',
  [AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_INACTIVE_CANNOT_BE_DEFAULT]:
    'serverSideErrors.additionalBusinessStatuses.inactiveCannotBeDefault',
  [AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_NOT_FOUND]:
    'serverSideErrors.additionalBusinessStatuses.statusNotFound',
}
