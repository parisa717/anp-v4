import clsx from 'clsx'
import { isSunday } from 'date-fns'
import { type ReactNode } from 'react'
import { DateHeaderProps } from 'react-big-calendar'

interface MonthDateHeaderProps extends DateHeaderProps {
  children?: ReactNode
}

export const MonthDateHeader = ({ isOffRange, date, label, onDrillDown, children }: MonthDateHeaderProps) => {
  // TODO: add checking if public holiday
  const isOutOfScope = isOffRange || isSunday(date)
  const textColor = isOutOfScope ? 'text-shade-300' : 'text-shade-700'

  return (
    <div className={clsx(`flex justify-between mx-2 my-1`, textColor)} role="cell">
      <button className="rbc-button-link text-base font-normal" type="button" onClick={onDrillDown}>
        {label}
      </button>
      {children}
    </div>
  )
}
