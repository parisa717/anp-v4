import { hasProperty } from '@nexus-ui/utils'
import isObject from 'lodash/isObject'

import { ServerSideValidationError, ServerSideValidationField, ServerSideValidationFields } from '../validationTypes'

export const isServerSideValidationError = (error: unknown): error is ServerSideValidationError => {
  if (!isObject(error)) {
    return false
  }

  if (!hasProperty(error, 'messageKey') || typeof error.messageKey !== 'string') {
    return false
  }

  if (hasProperty(error, 'context')) {
    if (!isObject(error.context)) {
      return false
    }

    const contextEntries = Object.entries(error.context)
    if (!contextEntries.every(([key, value]) => typeof key === 'string' && typeof value === 'string')) {
      return false
    }
  }

  if (hasProperty(error, 'plurality') && error.plurality !== null) {
    if (typeof error.plurality !== 'number') {
      return false
    }
  }

  return true
}

export const isServerSideValidationField = (field: unknown): field is ServerSideValidationField => {
  if (!isObject(field)) {
    return false
  }

  if (hasProperty(field, 'errors')) {
    if (!Array.isArray(field.errors)) {
      return false
    }

    if (!field.errors.every(isServerSideValidationError)) {
      return false
    }
  }

  if (hasProperty(field, 'children')) {
    if (!isObject(field.children)) {
      return false
    }

    const childrenValues = Object.values(field.children)
    if (!childrenValues.every(isServerSideValidationField)) {
      return false
    }
  }

  return true
}

export const isServerSideValidationFields = (fields: unknown): fields is ServerSideValidationFields => {
  if (!isObject(fields)) {
    return false
  }

  if (!hasProperty(fields, 'fields') || !isObject(fields.fields)) {
    return false
  }

  const fieldsValues = Object.values(fields.fields)
  return fieldsValues.every(isServerSideValidationField)
}
