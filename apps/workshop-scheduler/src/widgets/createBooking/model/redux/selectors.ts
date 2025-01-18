import { BookingStep } from './types'

export const selectActiveStep = (state: RootState) => state.createBooking.activeStep
export const selectStepData = (state: RootState) => state.createBooking.stepData
export const selectCustomerAndVehicleData = (state: RootState) =>
  state.createBooking.stepData[BookingStep.CUSTOMER_AND_VEHICLE]
export const selectChooseServiceData = (state: RootState) => state.createBooking.stepData[BookingStep.CHOOSE_SERVICE]
export const selectReceptionAndPickupData = (state: RootState) =>
  state.createBooking.stepData[BookingStep.RECEPTION_AND_PICKUP]
export const selectSummaryData = (state: RootState) => state.createBooking.stepData[BookingStep.SUMMARY]

export const selectStepValidation = (state: RootState, step: BookingStep) => state.createBooking.stepValidation[step]
export const selectAllStepValidations = (state: RootState) => state.createBooking.stepValidation
