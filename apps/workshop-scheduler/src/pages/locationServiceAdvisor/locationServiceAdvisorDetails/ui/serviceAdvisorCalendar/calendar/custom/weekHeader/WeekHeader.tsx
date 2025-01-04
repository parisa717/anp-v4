import clsx from 'clsx'
import { isSameDay, isSunday } from 'date-fns'
import { HeaderProps } from 'react-big-calendar'

import { WorkDay } from '../../../../../model'

type Props = HeaderProps & {
  workDays: WorkDay[]
}

export const WeekHeader = ({ date, workDays, label }: Props) => {
  const workDay = workDays.find((workDay) => isSameDay(workDay.date, date))
  const textColor = isSunday(date) || !workDay ? 'text-shade-300' : 'text-shade-700' //TODO: add checking if public holiday
  const textClassName = clsx(`text-base font-semibold`, textColor)
  return (
    <div className="flex flex-col">
      <span className={textClassName}>{label}</span>
      {workDay && <span className={textClassName}>{`${workDay.startTime}-${workDay.endTime}`}</span>}
    </div>
  )
}
