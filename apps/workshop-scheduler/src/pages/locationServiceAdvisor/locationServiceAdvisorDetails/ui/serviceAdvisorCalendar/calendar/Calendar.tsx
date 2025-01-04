import './Calendar.css'

import { useTranslation } from '@nexus-ui/i18n'
import { format, getDay, isSameDay, isSunday, parse, startOfWeek } from 'date-fns'
import {
  Calendar as ReactBigCalendar,
  dateFnsLocalizer,
  DateHeaderProps,
  Event,
  EventWrapperProps,
  HeaderProps,
  ToolbarProps,
  View,
  Views,
} from 'react-big-calendar'

import { MonthDateHeader, MonthHeader, Toolbar } from '@/shared/ui'

import { locales, useCurrentLocale } from '../../../lib'
import { EventResource, WorkDay } from '../../../model'
import { DayHeader, EventWrapper, TimeGutterHeader, TimeSlotWrapper, TimeSlotWrapperProps, WeekHeader } from './custom'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }), //month calendar starts on monday
  getDay,
  locales,
})

type Props = {
  events: Event[]
  view: View
  onChangeView: (view: View) => void
  onChangeSelectedDate: (date: Date) => void
  selectedDate: Date
  workDays: WorkDay[]
}

export const Calendar = ({ events, view, onChangeView, onChangeSelectedDate, selectedDate, workDays }: Props) => {
  const { t } = useTranslation()

  const { currentLocale } = useCurrentLocale()

  const handleDrillDown = (date: Date, view: View) => {
    onChangeSelectedDate(date)
    const newView = view === 'day' ? Views.DAY : Views.WEEK
    onChangeView(newView)
  }

  const getDayColumnProps = (date: Date) => {
    //TODO: add if public holiday
    if (view !== 'month') {
      const isOutOfWork = isSunday(date)
      return { className: isOutOfWork ? 'bg-shade-100' : 'bg-shade-000' }
    }
    return {}
  }

  return (
    <ReactBigCalendar<Event, EventResource>
      className="Calendar"
      events={events}
      localizer={localizer}
      popup
      defaultView="month"
      culture={currentLocale.code}
      view={view}
      onView={onChangeView}
      startAccessor="start"
      endAccessor="end"
      onDrillDown={handleDrillDown}
      allDayMaxRows={1}
      min={new Date(1970, 1, 1, 7, 0, 0)} // from 7:00 AM in week and day view
      max={new Date(1970, 1, 1, 23, 0, 0)} // to 10:00 PM in week and day view
      timeslots={1}
      step={60}
      onNavigate={(newDate) => {
        onChangeSelectedDate(newDate)
      }}
      date={selectedDate}
      dayPropGetter={getDayColumnProps}
      messages={{
        showMore: (count: number) => `+ ${count} ${t('calendar.showMore')}`,
      }}
      components={{
        eventWrapper: (props: EventWrapperProps) => <EventWrapper {...props} view={view} />,
        toolbar: (props: ToolbarProps) => (
          <Toolbar {...props} view={view} headerText={format(selectedDate, 'MMMM yyyy', { locale: currentLocale })} />
        ),
        month: {
          dateHeader: (props: DateHeaderProps) => {
            const workDay = workDays.find((workDay) => isSameDay(workDay.date, props.date))

            return (
              <MonthDateHeader {...props}>
                {workDay && <p className="m-0 text-base font-bold">{`${workDay.startTime}-${workDay.endTime}`}</p>}
              </MonthDateHeader>
            )
          },
          header: MonthHeader,
        },
        week: {
          header: (props: HeaderProps) => <WeekHeader {...props} workDays={workDays} />,
        },
        // @ts-expect-error react-big-calendar types do not include type fo timeSlotWrapper props
        timeSlotWrapper: (props: TimeSlotWrapperProps) => <TimeSlotWrapper {...props} workDays={workDays} />,
        timeGutterHeader: TimeGutterHeader,
        day: {
          header: (props: HeaderProps) => <DayHeader {...props} workDays={workDays} />,
        },
      }}
    />
  )
}
