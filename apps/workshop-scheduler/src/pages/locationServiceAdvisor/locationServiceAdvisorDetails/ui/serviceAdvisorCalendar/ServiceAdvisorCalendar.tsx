import { View } from 'react-big-calendar'

import { useServiceAdvisorCalendar } from '../../lib'
import { Calendar } from './calendar/Calendar'

type Props = {
  selectedDate: Date
  onChangeSelectedDate: (date: Date) => void
  currentView: View
  onChangeView: (view: View) => void
}

export const ServiceAdvisorCalendar = ({ selectedDate, onChangeSelectedDate, onChangeView, currentView }: Props) => {
  const { events, dataStatus, workDays } = useServiceAdvisorCalendar({ selectedDate })

  // TODO add error/loading handling
  if (dataStatus.isError) return <div>Error...</div>
  if (dataStatus.isLoading) return <div>Loading...</div>
  if (!dataStatus.isSuccess) return null

  return (
    <Calendar
      events={events}
      view={currentView}
      onChangeView={onChangeView}
      onChangeSelectedDate={onChangeSelectedDate}
      selectedDate={selectedDate}
      workDays={workDays}
    />
  )
}
