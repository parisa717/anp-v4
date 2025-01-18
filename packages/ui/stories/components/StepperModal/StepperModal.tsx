import clsx from 'clsx'
import { Dialog } from 'primereact/dialog'
import { ReactElement } from 'react'

import { ModalProps } from '../Modal'
import { Steps } from '../Steps'

export interface Step {
  label: string
  content: ReactElement
  width?: number
}

type StepperModalVariant = 'primary' | 'secondary'

export type StepperModalProps = Omit<ModalProps, 'onHide' | 'footer' | 'visible' | 'header' | 'width' | 'className'> & {
  activeStepIndex: number
  onHide?: () => void
  onStepperStepClick: (index: number) => void
  steps: Step[]
  stepsTitle: string
  visible?: boolean
  variant?: StepperModalVariant
  width?: number
}

export const StepperModal = ({
  activeStepIndex,
  onHide = () => {},
  onStepperStepClick,
  steps,
  stepsTitle,
  visible = true,
  variant = 'primary',
  width,
  ...props
}: StepperModalProps) => {
  width = steps[activeStepIndex].width || width

  return (
    <Dialog
      {...props}
      onHide={onHide}
      visible={visible}
      closeIcon={null}
      pt={{
        root: {
          className: clsx('bg-surface-0 p-4 ', variant === 'primary' && '!w-full h-full max-h-full'),
          style: {
            minWidth: width,
            width: width && `${(width / 1920) * 100}%`,
          },
        },
        mask: {
          className: 'p-8',
        },
      }}
      content={
        <div className="flex gap-4 h-full overflow-hidden">
          <div
            className={clsx(
              'px-[48px] py-[32px] rounded-md w-[408px] overflow-y-auto shrink-0',
              variant === 'primary' && 'bg-teal-50 border-r border-y-0 border-l-0 border-solid border-teal-700',
            )}
          >
            <h1 className="font-text-4xl-semibold-lineheight-100 text-bluegray-700 text-text-4xl-semibold-lineheight-100 leading-text-4xl-semibold-lineheight-100 m-0 mb-9">
              {stepsTitle}
            </h1>

            <Steps
              activeIndex={activeStepIndex}
              readOnly={false}
              items={steps}
              onSelect={(e) => onStepperStepClick(e.index)}
            />
          </div>

          <div
            data-cy="step-content"
            className={clsx('flex-grow pt-[32px]', variant === 'secondary' && 'pr-[48px] pb-[32px] overflow-y-auto')}
          >
            {steps[activeStepIndex].content}
          </div>
        </div>
      }
    ></Dialog>
  )
}
