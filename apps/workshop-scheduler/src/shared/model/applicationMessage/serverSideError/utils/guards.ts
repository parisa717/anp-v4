import { hasProperty } from '@nexus-ui/utils'
import isObject from 'lodash/isObject'

import { BaseGraphQLQueryMetaType, GraphQLError, GraphQLErrorResponse, RejectedGraphQLActionMeta } from '../types'

const isGraphQLError = (error: unknown): error is GraphQLError => {
  if (!isObject(error)) {
    return false
  }

  return (
    hasProperty(error, 'message') &&
    typeof error.message === 'string' &&
    hasProperty(error, 'extensions') &&
    isObject(error.extensions) &&
    hasProperty(error.extensions, 'code') &&
    typeof error.extensions.code === 'number'
  )
}

export const isGraphQLErrorResponse = (response: unknown): response is GraphQLErrorResponse => {
  if (!isObject(response)) {
    return false
  }

  if (!hasProperty(response, 'errors')) {
    return false
  }

  const { errors } = response
  return Array.isArray(errors) && errors.every(isGraphQLError)
}

const isBaseQueryMeta = (meta: unknown): meta is BaseGraphQLQueryMetaType => {
  if (!isObject(meta)) {
    return false
  }

  return hasProperty(meta, 'request') && hasProperty(meta, 'response') && isGraphQLErrorResponse(meta.response)
}

export const isRejectedActionMeta = (meta: unknown): meta is RejectedGraphQLActionMeta => {
  if (!isObject(meta)) {
    return false
  }

  return (
    hasProperty(meta, 'baseQueryMeta') &&
    isBaseQueryMeta(meta.baseQueryMeta) &&
    hasProperty(meta, 'rejectedWithValue') &&
    meta.rejectedWithValue === true &&
    hasProperty(meta, 'requestStatus') &&
    meta.requestStatus === 'rejected'
  )
}
