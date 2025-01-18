import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit'
import { t } from 'i18next'

import { replaceApplicationMessages } from '../slice'
import { ApplicationMessage } from '../types'
import { FeatureSpecificServerSideErrorHandler } from './handlers/FeatureSpecificServerSideErrorHandler'
import { GenericServerSideErrorHandler } from './handlers/GenericServerSideErrorHandler'
import { ValidationServerSideErrorHandler } from './handlers/ValidationServerSideErrorHandler'
import { RejectedGraphQLAction, ServerSideErrorCodesConfig } from './types'
import { isRejectedActionMeta } from './utils/guards'

export const createServerSideErrorListenerMiddleware = (
  errorCodes: ServerSideErrorCodesConfig,
  errorCodeToMessageKey: Record<number, string>,
) => {
  const middleware = createListenerMiddleware()

  const startAppListening = middleware.startListening.withTypes<RootState, AppDispatch>()

  startAppListening({
    predicate: (action): action is RejectedGraphQLAction => {
      if (!isRejectedWithValue(action)) {
        return false
      }

      if (!isRejectedActionMeta(action.meta)) {
        return false
      }

      const { errors } = action.meta.baseQueryMeta.response
      return Array.isArray(errors) && errors.length > 0
    },
    effect: async (action, listenerApi) => {
      const graphqlErrors = action.meta.baseQueryMeta.response.errors

      if (!graphqlErrors?.length) {
        return
      }

      const state = listenerApi.getState()
      const currentPage = state.router.currentRouterPageUrl || 'global'

      const handlers = [
        new ValidationServerSideErrorHandler(t, errorCodes, errorCodeToMessageKey),
        new FeatureSpecificServerSideErrorHandler(t, errorCodes, errorCodeToMessageKey),
        new GenericServerSideErrorHandler(t, errorCodes, errorCodeToMessageKey),
      ]
      const allMessages: ApplicationMessage[] = []

      for (const error of graphqlErrors) {
        for (const handler of handlers) {
          if (handler.canHandleError(error)) {
            const message = handler.handleSingleError(error, currentPage)
            allMessages.push(message)

            /** we break because once we find the necessary handler we can go and handle the next error */
            break
          }
        }
      }

      if (allMessages.length > 0) {
        listenerApi.dispatch(replaceApplicationMessages(allMessages))
      }
    },
  })

  return middleware
}
