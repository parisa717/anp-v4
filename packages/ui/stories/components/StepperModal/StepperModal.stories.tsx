import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { StepperModal, StepperModalProps } from './StepperModal'

const meta: Meta<typeof StepperModal> = {
  title: 'StepperModal',
  component: StepperModal,
}

export default meta

type Story = StoryObj<typeof StepperModal>

const DefaultStory = (_: StepperModalProps) => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { label: 'Step 1', content: <div>Content for Step 1</div>, width: 600 },
    { label: 'Step 2', content: <div>Content for Step 2</div>, width: 800 },
    { label: 'Step 3', content: <div>Content for Step 3</div>, width: 1000 },
  ]

  return (
    <StepperModal
      activeStepIndex={activeStep}
      steps={steps}
      stepsTitle="Example Steps"
      onStepperStepClick={setActiveStep}
      minWidth={600}
    />
  )
}

export const Default: Story = {
  render: DefaultStory,
}
