import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { additionalBusinessStatusSlice } from '@/entities/additionalBusinessStatus'
import { areaSlice } from '@/entities/area'
import { availabilityColorSlice } from '@/entities/availabilityColor'
import { brandSlice } from '@/entities/brand'
import { businessStatusSlice } from '@/entities/businessStatus'
import { customerSlice } from '@/entities/customer'
import { customerVehicleSlice } from '@/entities/customerVehicle'
import { followUpWorkSlice } from '@/entities/followUpWork'
import { locationSlice } from '@/entities/location'
import { locationCounterSlice } from '@/entities/locationCounter'
import { locationCounterCalendarSlice } from '@/entities/locationCounterCalendar'
import { locationOverbookingSlice } from '@/entities/locationOverbooking'
import { locationWorksSlice } from '@/entities/locationWork'
import { permissionSlice } from '@/entities/permission'
import { qualificationSlice } from '@/entities/qualification'
import { vehicleSlice } from '@/entities/vehicle'
import { workSlice } from '@/entities/work'
import { baseApi } from '@/shared/api'
import { applicationMessageSlice, createServerSideErrorListenerMiddleware, routerSlice } from '@/shared/model'
import { createBookingSlice } from '@/widgets/createBooking'

import { APP_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY, AppServerSideErrorCodes } from './appServerSideErrors'

export function getStore() {
  const serverSideErrorListenerMiddleware = createServerSideErrorListenerMiddleware(
    AppServerSideErrorCodes,
    APP_SERVER_SIDE_ERROR_CODE_TO_MESSAGE_KEY,
  )

  const store = configureStore({
    reducer: {
      [areaSlice.name]: areaSlice.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
      [businessStatusSlice.name]: businessStatusSlice.reducer,
      [additionalBusinessStatusSlice.name]: additionalBusinessStatusSlice.reducer,
      [locationSlice.name]: locationSlice.reducer,
      [availabilityColorSlice.name]: availabilityColorSlice.reducer,
      [brandSlice.name]: brandSlice.reducer,
      [applicationMessageSlice.name]: applicationMessageSlice.reducer,
      [locationOverbookingSlice.name]: locationOverbookingSlice.reducer,
      [locationWorksSlice.name]: locationWorksSlice.reducer,
      [workSlice.name]: workSlice.reducer,
      [qualificationSlice.name]: qualificationSlice.reducer,
      [locationCounterSlice.name]: locationCounterSlice.reducer,
      [locationCounterCalendarSlice.name]: locationCounterCalendarSlice.reducer,
      [followUpWorkSlice.name]: followUpWorkSlice.reducer,
      [permissionSlice.name]: permissionSlice.reducer,
      [routerSlice.name]: routerSlice.reducer,
      [customerVehicleSlice.name]: customerVehicleSlice.reducer,
      [customerSlice.name]: customerSlice.reducer,
      [vehicleSlice.name]: vehicleSlice.reducer,
      [createBookingSlice.name]: createBookingSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware).concat(serverSideErrorListenerMiddleware.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const store = getStore()

/** docs: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types **/
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
