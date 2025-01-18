import { useAppSelector } from '@/shared/model'

import { BookingStep } from '../model/redux'
import { selectAllStepValidations } from '../model/redux/selectors'

export const useCanProceedToStep = () => {
  const stepValidations = useAppSelector(selectAllStepValidations)

  return (targetStep: BookingStep) => {
    for (let step = BookingStep.CUSTOMER_AND_VEHICLE; step < targetStep; step++) {
      if (!stepValidations[step].isValid) {
        return false
      }
    }

    return true
  }
}
