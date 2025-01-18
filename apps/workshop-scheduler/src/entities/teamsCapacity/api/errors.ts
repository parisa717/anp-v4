export enum CapacityErrorCode {
  CAPACITY_TEAM_NOT_FOUND = 1729608396,
  CAPACITY_TEAMS_CAPACITY_NOT_FOUND = 1729847022,
  CAPACITY_LOCATION_NOT_FOUND = 1729862679,
  CAPACITY_TIME_RANGE_TOO_BIG = 1729847416,
}

export const CAPACITY_ERROR_CODE_TO_MESSAGE_KEY = {
  [CapacityErrorCode.CAPACITY_TEAM_NOT_FOUND]: 'serverSideErrors.capacity.teamNotFound',
  [CapacityErrorCode.CAPACITY_TEAMS_CAPACITY_NOT_FOUND]: 'serverSideErrors.capacity.teamsCapacityNotFound',
  [CapacityErrorCode.CAPACITY_LOCATION_NOT_FOUND]: 'serverSideErrors.capacity.locationNotFound',
  [CapacityErrorCode.CAPACITY_TIME_RANGE_TOO_BIG]: 'serverSideErrors.capacity.timeRangeTooBig',
}
