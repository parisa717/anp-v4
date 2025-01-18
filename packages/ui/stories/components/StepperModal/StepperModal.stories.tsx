import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { StepperModal, StepperModalProps } from './StepperModal'

const meta: Meta<typeof StepperModal> = {
  title: 'StepperModal',
  component: StepperModal,
}

export default meta

type Story = StoryObj<typeof StepperModal>

const DefaultStory = (props: StepperModalProps) => {
  const [activeStep, setActiveStep] = useState(0)

  return <StepperModal {...props} activeStepIndex={activeStep} onStepperStepClick={setActiveStep} />
}

export const Default: Story = {
  render: DefaultStory,
  args: {
    variant: 'primary',
    steps: [
      { label: 'Step 1', content: <div>Content for Step 1</div>, width: 1000 },
      { label: 'Step 2', content: <div>Content for Step 2</div>, width: 1200 },
      { label: 'Step 3', content: <div>Content for Step 3</div>, width: 1600 },
    ],
  },
}
