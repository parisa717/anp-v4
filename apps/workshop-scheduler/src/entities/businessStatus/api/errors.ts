export enum BusinessStatusErrorCode {
  BUSINESS_STATUS_EXISTS = 1727347268,
  BUSINESS_STATUS_ONLY_ONE_COULD_BE_MARKED_AS_DEFAULT = 1727347294,
  BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE = 1727347309,
  BUSINESS_STATUS_DEFAULT_CANNOT_BE_UNASSIGNED = 1727348151,
  BUSINESS_STATUS_INACTIVE_CANNOT_BE_DEFAULT = 1729239239,
  BUSINESS_STATUS_ALL_MUST_BE_PROVIDED_FOR_REORDERING = 1732698633,
  BUSINESS_STATUS_NOT_FOUND = 1727360172,
  ADDITIONAL_BUSINESS_STATUS_EXISTS = 1727359611,
}

export const BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY = {
  [BusinessStatusErrorCode.BUSINESS_STATUS_EXISTS]: 'serverSideErrors.businessStatuses.statusExists',
  [BusinessStatusErrorCode.BUSINESS_STATUS_ONLY_ONE_COULD_BE_MARKED_AS_DEFAULT]:
    'serverSideErrors.businessStatuses.onlyOneCouldBeMarkedAsDefault',
  [BusinessStatusErrorCode.BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE]:
    'serverSideErrors.businessStatuses.atLeastOneActive',
  [BusinessStatusErrorCode.BUSINESS_STATUS_DEFAULT_CANNOT_BE_UNASSIGNED]:
    'serverSideErrors.businessStatuses.defaultCannotBeUnassigned',
  [BusinessStatusErrorCode.BUSINESS_STATUS_INACTIVE_CANNOT_BE_DEFAULT]:
    'serverSideErrors.businessStatuses.inactiveCannotBeDefault',
  [BusinessStatusErrorCode.BUSINESS_STATUS_ALL_MUST_BE_PROVIDED_FOR_REORDERING]:
    'serverSideErrors.businessStatuses.allMustBeProvidedForReordering',
  [BusinessStatusErrorCode.BUSINESS_STATUS_NOT_FOUND]: 'serverSideErrors.businessStatuses.statusNotFound',
  [BusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_EXISTS]:
    'serverSideErrors.additionalBusinessStatuses.statusExists',
}
