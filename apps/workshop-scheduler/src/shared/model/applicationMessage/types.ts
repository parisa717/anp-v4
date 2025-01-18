import { MessagesMessage as PrimeMessage } from 'primereact/messages'

import { AllRoutePaths } from '@/shared/lib'

import { ServerSideError } from './serverSideError/types'

export type APPLICATION_MESSAGE_PAGE = AllRoutePaths | 'global'

export enum APPLICATION_MESSAGE_TYPE {
  FORM = 'form',
  OPERATION = 'operation',
  SERVER_SIDE_VALIDATION = 'server_side_validation',
  SERVER_SIDE_FEATURE_SPECIFIC = 'server_side_feature_specific',
  SERVER_SIDE_AUTH = 'server_side_auth',
  SERVER_SIDE_GENERIC = 'server_side_generic',
}

export type ApplicationMessage = PrimeMessage & {
  id: string
  page: APPLICATION_MESSAGE_PAGE
  type: APPLICATION_MESSAGE_TYPE
  summary: PrimeMessage['summary']
  detail: PrimeMessage['detail']
  error?: ServerSideError
  validationErrors?: Record<string, string[]>
}
