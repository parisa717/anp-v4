import { Steps as PrimeReactSteps, StepsProps as PrimeReactStepsProps } from 'primereact/steps'

export interface StepsProps extends Omit<PrimeReactStepsProps, 'model'> {
  items: PrimeReactStepsProps['model']
}

const pt = {
  menu: { className: 'flex flex-col gap-6' },
  menuitem: {
    className: 'justify-start items-center before:border-t-0',
  },
  action: {
    className: 'flex flex-row items-center justify-center gap-3 bg-[transparent]',
  },
  label: {
    className: 'mt-0 text-steps-item leading-steps-item [:has(~_.p-highlight)_&]:font-bold  [.p-highlight_&]:font-bold',
  },
  step: {
    className: `
    border-steps-item text-steps-item-number leading-steps-item-number font-steps-item-number bg-[transparent]
    [:has(~_.p-highlight)_&]:border-none [:has(~_.p-highlight)_&]:bg-steps-item [:has(~_.p-highlight)_&]:text-steps-item-number-highlith
    [.p-highlight_&]:border-none [.p-highlight_&]:bg-steps-item [.p-highlight_&]:text-steps-item-number-highlith`,
  },
}

export const Steps = ({ items, ...otherProps }: StepsProps) => {
  return <PrimeReactSteps {...otherProps} model={items} pt={pt} />
}
