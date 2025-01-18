import { useCallback } from 'react'

import { useAppSelector } from '@/shared/model'

import { BookingStep, selectAllStepValidations } from '../model/redux'

export const useStepValidation = () => {
  const allStepValidations = useAppSelector(selectAllStepValidations)

  return useCallback(
    (step: BookingStep) => {
      return allStepValidations[step].isValid
    },
    [allStepValidations],
  )
}
