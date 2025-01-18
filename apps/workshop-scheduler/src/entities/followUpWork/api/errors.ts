export enum FollowUpWorkErrorCode {
  FOLLOW_UP_WORK_ALREADY_EXISTS = 1731074999,
  FOLLOW_UP_WORK_NOT_FOUND = 1731075013,
  FOLLOW_UP_WORK_QUALIFICATION_NOT_EXIST = 1731066196,
}

export const FOLLOW_UP_WORK_ERROR_CODE_TO_MESSAGE_KEY = {
  [FollowUpWorkErrorCode.FOLLOW_UP_WORK_ALREADY_EXISTS]: 'serverSideErrors.followUpWorks.alreadyExists',
  [FollowUpWorkErrorCode.FOLLOW_UP_WORK_NOT_FOUND]: 'serverSideErrors.followUpWorks.notFound',
  [FollowUpWorkErrorCode.FOLLOW_UP_WORK_QUALIFICATION_NOT_EXIST]:
    'serverSideErrors.followUpWorks.qualificationNotExist',
}
