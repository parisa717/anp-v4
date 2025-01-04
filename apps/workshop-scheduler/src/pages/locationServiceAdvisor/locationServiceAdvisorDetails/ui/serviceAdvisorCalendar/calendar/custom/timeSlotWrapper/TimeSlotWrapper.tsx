import { isSameDay, isWithinInterval, subMinutes } from 'date-fns'
import { ReactNode } from 'react'

import { WorkDay } from '../../../../../model'

export type TimeSlotWrapperProps = {
  value: Date
  children: ReactNode
}

type Props = TimeSlotWrapperProps & {
  workDays: WorkDay[]
}

export const TimeSlotWrapper = ({ workDays, value, children }: Props) => {
  const workDay = workDays.find((workDay) => isSameDay(workDay.date, value))

  const isWorkTime = workDay
    ? isWithinInterval(value, { end: subMinutes(workDay.endDate, 1), start: workDay.startDate })
    : false

  return <div className={isWorkTime ? `bg-shade-000` : `bg-shade-100`}>{children}</div>
}
