import { CORE_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY, CoreServerSideErrorCode } from '@nexus-ui/utils'

import {
  ADDITIONAL_BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY,
  AdditionalBusinessStatusErrorCode,
} from '@/entities/additionalBusinessStatus'
import { AREA_ERROR_CODE_TO_MESSAGE_KEY, AreaErrorCode } from '@/entities/area'
import { AVAILABILITY_COLOR_ERROR_CODE_TO_MESSAGE_KEY, AvailabilityColorErrorCode } from '@/entities/availabilityColor'
import { BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY, BusinessStatusErrorCode } from '@/entities/businessStatus'
import { CUSTOMER_ERROR_CODE_TO_MESSAGE_KEY, CustomerErrorCode } from '@/entities/customer'
import { FOLLOW_UP_WORK_ERROR_CODE_TO_MESSAGE_KEY, FollowUpWorkErrorCode } from '@/entities/followUpWork'
import { LOCATION_ERROR_CODE_TO_MESSAGE_KEY, LocationErrorCode } from '@/entities/location'
import { COUNTER_ERROR_CODE_TO_MESSAGE_KEY, CounterErrorCode } from '@/entities/locationCounter'
import {
  LOCATION_OVERBOOKING_ERROR_CODE_TO_MESSAGE_KEY,
  LocationOverbookingErrorCode,
} from '@/entities/locationOverbooking'
import { LOCATION_WORK_ERROR_CODE_TO_MESSAGE_KEY, LocationWorkErrorCode } from '@/entities/locationWork'
import { CAPACITY_ERROR_CODE_TO_MESSAGE_KEY, CapacityErrorCode } from '@/entities/teamsCapacity'
import { VEHICLE_ERROR_CODE_TO_MESSAGE_KEY, VehicleErrorCode } from '@/entities/vehicle'
import { WORK_ERROR_CODE_TO_MESSAGE_KEY, WorkErrorCode } from '@/entities/work'

export const AppServerSideErrorCodes = {
  ...CoreServerSideErrorCode,
  ...BusinessStatusErrorCode,
  ...LocationErrorCode,
  ...AdditionalBusinessStatusErrorCode,
  ...AreaErrorCode,
  ...LocationWorkErrorCode,
  ...LocationOverbookingErrorCode,
  ...AvailabilityColorErrorCode,
  ...WorkErrorCode,
  ...CustomerErrorCode,
  ...VehicleErrorCode,
  ...FollowUpWorkErrorCode,
  ...CounterErrorCode,
  ...CapacityErrorCode,
} as const

export const APP_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY = {
  ...CORE_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY,
  ...BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY,
  ...LOCATION_ERROR_CODE_TO_MESSAGE_KEY,
  ...ADDITIONAL_BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY,
  ...AREA_ERROR_CODE_TO_MESSAGE_KEY,
  ...LOCATION_WORK_ERROR_CODE_TO_MESSAGE_KEY,
  ...LOCATION_OVERBOOKING_ERROR_CODE_TO_MESSAGE_KEY,
  ...AVAILABILITY_COLOR_ERROR_CODE_TO_MESSAGE_KEY,
  ...WORK_ERROR_CODE_TO_MESSAGE_KEY,
  ...CUSTOMER_ERROR_CODE_TO_MESSAGE_KEY,
  ...VEHICLE_ERROR_CODE_TO_MESSAGE_KEY,
  ...FOLLOW_UP_WORK_ERROR_CODE_TO_MESSAGE_KEY,
  ...COUNTER_ERROR_CODE_TO_MESSAGE_KEY,
  ...CAPACITY_ERROR_CODE_TO_MESSAGE_KEY,
}
