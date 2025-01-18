import { PayloadAction } from '@reduxjs/toolkit'

import { CustomerVehicleDetailsEntity } from '@/entities/customerVehicle'

import { CustomerAndVehicleFormType } from '../formSchema'
import { BookingStep, CreateBookingState } from './types'

export const customerAndVehicleReducers = {
  setSearchFilters: (state: CreateBookingState, action: PayloadAction<CustomerAndVehicleFormType>) => {
    state.stepData[BookingStep.CUSTOMER_AND_VEHICLE].searchFilters = action.payload
  },
  setSelectedVehicle: (state: CreateBookingState, action: PayloadAction<CustomerVehicleDetailsEntity>) => {
    state.stepData[BookingStep.CUSTOMER_AND_VEHICLE].selectedVehicle = action.payload

    state.stepValidation[BookingStep.CUSTOMER_AND_VEHICLE] = {
      isValid: Boolean(action.payload),
    }
  },
}
