export enum AvailabilityColorErrorCode {
  AVAILABILITY_COLOR_CAPACITY_VALUES = 1727774716,
  AVAILABILITY_COLOR_COLORS_CAN_NOT_OVERLAP = 1727774707,
  AVAILABILITY_COLOR_COLORS_CAN_NOT_HAVE_GAPS = 1732183967,
  AVAILABILITY_COLOR_MIN_HIGHER_THAN_MAX = 1732183969,
  AVAILABILITY_COLOR_COLORS_CONFIGURATION_NUMBER = 1732266187,
}

export const AVAILABILITY_COLOR_ERROR_CODE_TO_MESSAGE_KEY = {
  [AvailabilityColorErrorCode.AVAILABILITY_COLOR_CAPACITY_VALUES]: 'serverSideErrors.availabilityColors.capacityValues',
  [AvailabilityColorErrorCode.AVAILABILITY_COLOR_COLORS_CAN_NOT_OVERLAP]:
    'serverSideErrors.availabilityColors.colorsCannotOverlap',
  [AvailabilityColorErrorCode.AVAILABILITY_COLOR_COLORS_CAN_NOT_HAVE_GAPS]:
    'serverSideErrors.availabilityColors.colorsCannotHaveGaps',
  [AvailabilityColorErrorCode.AVAILABILITY_COLOR_MIN_HIGHER_THAN_MAX]:
    'serverSideErrors.availabilityColors.minHigherThanMax',
  [AvailabilityColorErrorCode.AVAILABILITY_COLOR_COLORS_CONFIGURATION_NUMBER]:
    'serverSideErrors.availabilityColors.configurationNumber',
}
