export enum CustomerErrorCode {
  CUSTOMER_NOT_FOUND = 1731663278,
}

export const CUSTOMER_ERROR_CODE_TO_MESSAGE_KEY = {
  [CustomerErrorCode.CUSTOMER_NOT_FOUND]: 'serverSideErrors.customer.notFound',
}
