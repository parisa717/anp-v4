export enum VehicleErrorCode {
  VEHICLE_NOT_FOUND = 1731934067,
}

export const VEHICLE_ERROR_CODE_TO_MESSAGE_KEY = {
  [VehicleErrorCode.VEHICLE_NOT_FOUND]: 'serverSideErrors.vehicle.notFound',
}
