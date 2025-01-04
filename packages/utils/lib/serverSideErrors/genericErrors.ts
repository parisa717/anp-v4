export enum CoreServerSideErrorCode {
  VALIDATION = 1724067624,
  AUTH = 1723545811,
  GENERIC = 0,
}

export const CORE_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY = {
  [CoreServerSideErrorCode.AUTH]: 'serverSideErrors.auth.unauthorized',
  [CoreServerSideErrorCode.GENERIC]: 'serverSideErrors.generic.unexpectedError',
}
