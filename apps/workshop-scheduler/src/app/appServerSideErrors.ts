import { CORE_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY, CoreServerSideErrorCode } from '@nexus-ui/utils'

import { BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY, BusinessStatusErrorCode } from '@/entities/businessStatus'
import { LOCATION_ERROR_CODE_TO_MESSAGE_KEY, LocationErrorCode } from '@/entities/location'

export const AppServerSideErrorCodes = {
  ...CoreServerSideErrorCode,
  ...BusinessStatusErrorCode,
  ...LocationErrorCode,
} as const

export const APP_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY = {
  ...CORE_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY,
  ...BUSINESS_STATUS_ERROR_CODE_TO_MESSAGE_KEY,
  ...LOCATION_ERROR_CODE_TO_MESSAGE_KEY,
}
