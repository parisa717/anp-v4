import { CustomerVehicleDetailsEntity } from '@/entities/customerVehicle'

import { CustomerAndVehicleFormType } from '../formSchema'

export enum BookingStep {
  CUSTOMER_AND_VEHICLE = 0,
  CHOOSE_SERVICE = 1,
  RECEPTION_AND_PICKUP = 2,
  SUMMARY = 3,
}

export interface CustomerAndVehicleStepData {
  searchFilters: CustomerAndVehicleFormType | null
  selectedVehicle: CustomerVehicleDetailsEntity | null
}

export interface ChooseServiceStepData {
  // TODO to be implemented later
}

export interface ReceptionAndPickupStepData {
  // TODO to be implemented later
}

export interface SummaryStepData {
  // TODO to be implemented later
}

export interface StepValidation {
  isValid: boolean
}

type StepDataMap = {
  [BookingStep.CUSTOMER_AND_VEHICLE]: CustomerAndVehicleStepData
  [BookingStep.CHOOSE_SERVICE]: ChooseServiceStepData
  [BookingStep.RECEPTION_AND_PICKUP]: ReceptionAndPickupStepData
  [BookingStep.SUMMARY]: SummaryStepData
}

export interface CreateBookingState {
  activeStep: BookingStep
  stepValidation: {
    [key in BookingStep]: StepValidation
  }
  stepData: {
    [key in BookingStep]: StepDataMap[key]
  }
}
