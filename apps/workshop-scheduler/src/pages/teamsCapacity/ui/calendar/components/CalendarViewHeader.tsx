import { getDay } from 'date-fns'
import { HeaderProps, View } from 'react-big-calendar'
import { useTranslation } from 'react-i18next'

import { mapDayNumberToDayName } from '@/entities/locationCounterCalendar'

interface CalendarViewHeaderProps extends HeaderProps {
  view?: View
}

export const CalendarViewHeader = (props: CalendarViewHeaderProps) => {
  const { t } = useTranslation()

  const isDayView = props.view === 'day'
  const workingDayFullName = mapDayNumberToDayName(t)[getDay(new Date(props.date))]
  const header = isDayView ? workingDayFullName : props.label

  return (
    <div className="text-base text-shade-700 font-bold">
      <span role="columnheader" className="text-base">
        {header}
      </span>
    </div>
  )
}
