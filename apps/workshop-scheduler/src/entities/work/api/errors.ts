export enum WorkErrorCode {
  WORK_ALREADY_EXISTS = 1730975824,
  WORK_NOT_FOUND = 1730975826,
  WORK_QUALIFICATION_NOT_EXIST = 1731066196,
  WORK_BRAND_NOT_EXIST = 1731066198,
  WORK_LOCATION_NOT_EXIST = 1731067716,
  WORK_LOCATION_NOT_SUPPORT_BRAND = 1731068036,
}

export const WORK_ERROR_CODE_TO_MESSAGE_KEY = {
  [WorkErrorCode.WORK_ALREADY_EXISTS]: 'serverSideErrors.works.alreadyExists',
  [WorkErrorCode.WORK_NOT_FOUND]: 'serverSideErrors.works.notFound',
  [WorkErrorCode.WORK_QUALIFICATION_NOT_EXIST]: 'serverSideErrors.works.qualificationNotExist',
  [WorkErrorCode.WORK_BRAND_NOT_EXIST]: 'serverSideErrors.works.brandNotExist',
  [WorkErrorCode.WORK_LOCATION_NOT_EXIST]: 'serverSideErrors.works.locationNotExist',
  [WorkErrorCode.WORK_LOCATION_NOT_SUPPORT_BRAND]: 'serverSideErrors.works.locationNotSupportBrand',
}
