import { createApi } from '@reduxjs/toolkit/query/react'

import { createBaseQuery } from './createBaseQuery'
import type { BaseQueryConfig } from './types'

export const createBaseApi = (config: BaseQueryConfig) => {
  return createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery(config),
    endpoints: () => ({}),
  })
}
