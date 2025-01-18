import clsx from 'clsx'
import { type ReactNode } from 'react'

interface StepWrapperProps {
  children: ReactNode
  className?: {
    root?: string
    children?: string
  }
  footer: ReactNode
}

export const StepWrapper = ({ children, className, footer }: StepWrapperProps) => {
  return (
    <div className={clsx('flex flex-col gap-6 justify-between h-full', className?.root)}>
      <div className={clsx('flex flex-col pl-24 pr-28 grow overflow-auto', className?.children)}>{children}</div>
      {footer}
    </div>
  )
}
