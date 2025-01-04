import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { areaSlice } from '@/entities/area'
import { brandSlice } from '@/entities/brand'
import { countrySlice } from '@/entities/country'
import { baseApi } from '@/shared/api'

export function getStore() {
  const store = configureStore({
    reducer: {
      [areaSlice.name]: areaSlice.reducer,
      [brandSlice.name]: brandSlice.reducer,
      [countrySlice.name]: countrySlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const store = getStore()

/** docs: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types **/
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
