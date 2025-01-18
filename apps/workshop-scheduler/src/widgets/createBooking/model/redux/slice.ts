import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { chooseServiceReducers } from './chooseServiceReducers'
import { customerAndVehicleReducers } from './customerAndVehicleReducers'
import { receptionAndPickupReducers } from './receptionAndPickupReducers'
import { summaryReducers } from './summaryReducers'
import { BookingStep, CreateBookingState } from './types'
import { validationReducers } from './validationReducers'

const initialState: CreateBookingState = {
  activeStep: BookingStep.CUSTOMER_AND_VEHICLE,
  stepValidation: {
    [BookingStep.CUSTOMER_AND_VEHICLE]: { isValid: false },
    [BookingStep.CHOOSE_SERVICE]: { isValid: false },
    [BookingStep.RECEPTION_AND_PICKUP]: { isValid: false },
    [BookingStep.SUMMARY]: { isValid: false },
  },
  stepData: {
    [BookingStep.CUSTOMER_AND_VEHICLE]: {
      searchFilters: null,
      selectedVehicle: null,
    },
    [BookingStep.CHOOSE_SERVICE]: {},
    [BookingStep.RECEPTION_AND_PICKUP]: {},
    [BookingStep.SUMMARY]: {},
  },
}

export const createBookingSlice = createSlice({
  name: 'createBooking',
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<BookingStep>) => {
      state.activeStep = action.payload
    },

    ...customerAndVehicleReducers,
    ...chooseServiceReducers,
    ...receptionAndPickupReducers,
    ...summaryReducers,

    ...validationReducers,

    resetCreateBooking: () => initialState,
  },
})

export const { setActiveStep, setSearchFilters, setSelectedVehicle, resetCreateBooking, setStepValidation } =
  createBookingSlice.actions

export default createBookingSlice.reducer
