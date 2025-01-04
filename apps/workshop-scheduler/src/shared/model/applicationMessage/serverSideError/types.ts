import { GraphQLError as OriginalGraphQLError } from 'graphql'

import { ServerSideValidationContext } from './validationTypes'

export type ServerSideErrorCodesConfig = {
  [key: string]: number | string
}

export type ServerSideError = {
  code: number
  message: string
  context?: Record<string, unknown> | ServerSideValidationContext
}

export type GraphQLError = OriginalGraphQLError & {
  extensions: ServerSideError
}

export type GraphQLErrorResponse<TData = unknown> = {
  errors?: GraphQLError[]
  data: Partial<TData> | null
}

type GraphQLRequest = {
  query: string
  variables?: Record<string, unknown>
}

export type BaseGraphQLQueryMetaType = {
  request: GraphQLRequest
  response: GraphQLErrorResponse
}

export type RejectedGraphQLActionMeta = {
  baseQueryMeta: BaseGraphQLQueryMetaType
  requestId: string
  rejectedWithValue: true
  requestStatus: 'rejected'
  aborted: boolean
  condition: boolean
}

export type RejectedGraphQLAction = {
  payload: {
    name: string
    message: string
    stack: string
  }
  meta: RejectedGraphQLActionMeta
  error: { message: string }
  type: string
}
