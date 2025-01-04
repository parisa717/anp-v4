import { configureStore } from '@reduxjs/toolkit'

export function getStore() {
  return configureStore({
    reducer: {},
  })
}

export const store = getStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
