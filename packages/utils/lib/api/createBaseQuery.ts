import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

import { GATEWAY_HEADER_KEY } from '../proxyConsts'
import { customizeError } from './customizeError'
import type { BaseQueryConfig } from './types'

export const createBaseQuery = ({ gatewayHeaderValue, apiEndpoint }: BaseQueryConfig) => {
  return graphqlRequestBaseQuery({
    url: apiEndpoint,
    customErrors: customizeError,
    prepareHeaders: (headers, api) => {
      const state = api.getState()
      let accessToken

      if (
        state &&
        typeof state === 'object' &&
        'session' in state &&
        state.session &&
        typeof state.session === 'object' &&
        'accessToken' in state.session &&
        state.session.accessToken
      ) {
        accessToken = state.session.accessToken
      }

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }

      headers.set(GATEWAY_HEADER_KEY, gatewayHeaderValue)

      return headers
    },
  })
}
