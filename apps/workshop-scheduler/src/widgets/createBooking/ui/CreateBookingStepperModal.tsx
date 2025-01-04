import { useTranslation } from '@nexus-ui/i18n'
import { StepperModal } from '@nexus-ui/ui'
import { useState } from 'react'

import { CustomerAndVehicleStep } from './steps'
import { StepWrapper } from './StepWrapper'

const stepperModalPt = {
  header: {
    className: 'hidden',
  },
  content: {
    className: 'p-4',
  },
}
const stepperModalStepsPt = {
  action: {
    className: 'flex flex-row items-center justify-center gap-3 bg-teal-50',
  },
}
const stepperModalClassname = {
  stepperWrapper: 'flex min-h-[700px]',
  stepper: 'bg-teal-50 py-9 pl-14 pr-20 border-r-2 border-y-0 border-l-0 border-solid border-teal-700 rounded',
}

export const CreateBookingStepperModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.${key}`)

  const [activeIndex, setActiveIndex] = useState(0)

  const handleStepChange = (index: number) => {
    setActiveIndex(index)
  }

  const handleNextStepClick = () => setActiveIndex((index) => index + 1)

  const handlePrevStepClick = () => setActiveIndex((index) => index && index - 1)

  const formSteps = [
    {
      label: translate('steps.customerAndVehicle.title'),
      content: <CustomerAndVehicleStep />,
      width: '70%',
    },
    {
      label: translate('steps.chooseService.title'),
      content: <div>STEP 2</div>,
      width: '70%',
    },
    {
      label: translate('steps.receptionAndPickUpDate.title'),
      content: <div>STEP 3</div>,
      width: '70%',
    },
    {
      label: translate('steps.summary.title'),
      content: <div>STEP 4</div>,
      width: '70%',
    },
  ]

  const isLastStep = activeIndex === formSteps.length - 1

  const formStepsWithFooter = formSteps.map((step) => ({
    ...step,
    content: (
      <StepWrapper
        isFirstStep={!activeIndex}
        isLastStep={isLastStep}
        onNext={handleNextStepClick}
        onPrev={handlePrevStepClick}
        onCancel={onClose}
      >
        {step.content}
      </StepWrapper>
    ),
  }))

  return (
    <StepperModal
      activeStepIndex={activeIndex}
      onStepperStepClick={handleStepChange}
      steps={formStepsWithFooter}
      stepsTitle={translate('title')}
      minWidth={1855}
      pt={stepperModalPt}
      stepsPt={stepperModalStepsPt}
      className={stepperModalClassname}
    />
  )
}
