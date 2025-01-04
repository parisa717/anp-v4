import merge from 'lodash/merge'
import { Steps as PrimeReactSteps, StepsProps as PrimeReactStepsProps } from 'primereact/steps'

export interface StepsProps extends Omit<PrimeReactStepsProps, 'model'> {
  items: PrimeReactStepsProps['model']
}

export const Steps = ({ items, pt, ...otherProps }: StepsProps) => {
  const defaultPt = {
    menu: { className: 'flex flex-col gap-6' },
    menuitem: {
      className: 'justify-start items-center before:border-t-0',
    },
    action: {
      className: 'flex flex-row items-center justify-center gap-3',
    },
    label: {
      className: 'mt-0 text-steps-item leading-steps-item',
    },
    step: {
      className: 'border-steps-item text-steps-item-number leading-steps-item-number font-steps-item-number',
    },
  }

  const mergedPt = merge(defaultPt, pt || {})

  return <PrimeReactSteps {...otherProps} model={items} pt={mergedPt} />
}
