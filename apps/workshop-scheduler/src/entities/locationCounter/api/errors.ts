export enum CounterErrorCode {
  COUNTER_NOT_FOUND = 1729780110,
  COUNTER_LOCATION_NOT_FOUND = 1729862679,
}

export const COUNTER_ERROR_CODE_TO_MESSAGE_KEY = {
  [CounterErrorCode.COUNTER_NOT_FOUND]: 'serverSideErrors.counters.notFound',
  [CounterErrorCode.COUNTER_LOCATION_NOT_FOUND]: 'serverSideErrors.counters.locationNotFound',
}
