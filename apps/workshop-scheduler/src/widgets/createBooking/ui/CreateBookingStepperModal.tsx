import { useTranslation } from '@nexus-ui/i18n'
import { Step, StepperModal } from '@nexus-ui/ui'
import { cloneElement } from 'react'

import { useAppDispatch, useAppSelector } from '@/shared/model'

import { useCanProceedToStep, useStepValidation } from '../lib'
import { BookingStep, resetCreateBooking, selectActiveStep, setActiveStep } from '../model/redux'
import { CustomerAndVehicleStep } from './steps'

export const CreateBookingStepperModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.${key}`)

  const dispatch = useAppDispatch()
  const activeIndex = useAppSelector(selectActiveStep)
  const validateStep = useStepValidation()
  const canProceedToStep = useCanProceedToStep()

  const handleStepNext = async () => {
    if (activeIndex === BookingStep.SUMMARY) {
      await handleSubmitBooking()
    } else {
      if (validateStep(activeIndex)) {
        dispatch(setActiveStep(activeIndex + 1))
      }
    }
  }

  const handleStepPrev = () => {
    if (activeIndex > 0) {
      dispatch(setActiveStep(activeIndex - 1))
    }
  }

  const handleStepChange = (index: number) => {
    if (canProceedToStep(index)) {
      dispatch(setActiveStep(index))
    }
  }

  const handleClose = () => {
    dispatch(resetCreateBooking())
    onClose()
  }

  const handleSubmitBooking = async () => {
    // TODO here we will prepare the data and make an API call

    handleClose()
  }

  const stepFooterProps = (step: BookingStep) => ({
    step,
    isValid: validateStep(step),
    onStepNext: handleStepNext,
    onStepPrev: handleStepPrev,
    onCancel: handleClose,
    className: { root: 'h-[1312px]' },
  })

  const formSteps: Step[] = [
    {
      label: translate('steps.customerAndVehicle.title'),
      content: <CustomerAndVehicleStep />,
    },
    {
      label: translate('steps.chooseService.title'),
      content: <div>STEP 2</div>,
    },
    {
      label: translate('steps.receptionAndPickUpDate.title'),
      content: <div>STEP 3</div>,
    },
    {
      label: translate('steps.summary.title'),
      content: <div>STEP 4</div>,
    },
  ]

  const steps = formSteps.map((step) => ({
    ...step,
    content: cloneElement(step.content, { stepFooterProps }),
  }))

  return (
    <StepperModal
      activeStepIndex={activeIndex}
      onStepperStepClick={handleStepChange}
      steps={steps}
      stepsTitle={translate('title')}
    />
  )
}
