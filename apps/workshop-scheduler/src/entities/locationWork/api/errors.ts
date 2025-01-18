export enum LocationWorkErrorCode {
  LOCATION_WORK_ALREADY_EXISTS = 1730992791,
  LOCATION_WORK_NOT_FOUND = 1730992792,
  LOCATION_WORK_LOCATION_NOT_EXIST = 1731067716,
  LOCATION_WORK_BRAND_NOT_SUPPORTED = 1731068036,
  LOCATION_WORK_WORKSHOP_WORK_NOT_EXIST = 1731067103,
  LOCATION_WORK_BRAND_NOT_EXIST = 1731066198,
}

export const LOCATION_WORK_ERROR_CODE_TO_MESSAGE_KEY = {
  [LocationWorkErrorCode.LOCATION_WORK_ALREADY_EXISTS]: 'serverSideErrors.locationWorks.alreadyExists',
  [LocationWorkErrorCode.LOCATION_WORK_NOT_FOUND]: 'serverSideErrors.locationWorks.notFound',
  [LocationWorkErrorCode.LOCATION_WORK_LOCATION_NOT_EXIST]: 'serverSideErrors.locationWorks.locationNotExist',
  [LocationWorkErrorCode.LOCATION_WORK_BRAND_NOT_SUPPORTED]: 'serverSideErrors.locationWorks.brandNotSupported',
  [LocationWorkErrorCode.LOCATION_WORK_WORKSHOP_WORK_NOT_EXIST]: 'serverSideErrors.locationWorks.workshopWorkNotExist',
  [LocationWorkErrorCode.LOCATION_WORK_BRAND_NOT_EXIST]: 'serverSideErrors.locationWorks.brandNotExist',
}
