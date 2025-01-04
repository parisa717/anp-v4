import { useMemo } from 'react'
import { FieldErrors } from 'react-hook-form'
import { z } from 'zod'

const isRecordStringUnknown = (value: unknown): value is Record<string, unknown> => {
  // Check if value is an object and not null
  if (typeof value !== 'object' || value === null) {
    return false
  }

  // Check if all entries have string keys and defined values
  return Object.entries(value).every(([key, val]) => {
    return typeof key === 'string' && (val !== undefined || key === 'ref')
  })
}

const collectErrorMessages = (errors: Record<string, unknown>, ignoredMessages: string[] = []) => {
  /**
   * Using Set to deduplicate the error messages
   */
  const messagesSet = new Set<string>()

  const collectErrors = (obj: Record<string, unknown>) => {
    for (const key in obj) {
      const value = obj[key]

      // Check if the current value is an error message
      if (key === 'message' && typeof value === 'string') {
        if (!ignoredMessages.includes(value)) {
          messagesSet.add(value)
        }
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          if (isRecordStringUnknown(item)) {
            collectErrors(item)
          }
        })
      }

      // Check if the value is an object or array to recurse into
      else if (value && isRecordStringUnknown(value)) {
        collectErrors(value)
      }
    }
  }

  collectErrors(errors)
  return messagesSet
}

export const useErrorMessages = (
  errors: FieldErrors<z.Schema>,
  ignoredMessages: string[] = [],
  t: (key: string) => string,
) => {
  return useMemo(() => {
    const messages = Array.from(collectErrorMessages(errors, ignoredMessages))

    return messages.map((message) => ({
      title: t('error'),
      message,
    }))
  }, [errors, ignoredMessages, t])
}
