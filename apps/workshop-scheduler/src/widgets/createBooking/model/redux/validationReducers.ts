import { PayloadAction } from '@reduxjs/toolkit'

import { BookingStep, CreateBookingState, StepValidation } from './types'

export const validationReducers = {
  setStepValidation: (
    state: CreateBookingState,
    action: PayloadAction<{
      step: BookingStep
      validation: StepValidation
    }>,
  ) => {
    const { step, validation } = action.payload
    state.stepValidation[step] = validation
  },
}
