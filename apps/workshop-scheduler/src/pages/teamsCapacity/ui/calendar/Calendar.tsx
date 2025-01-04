import './Calendar.css'

import { isSupportedLanguage, SupportedLanguages, useTranslation } from '@nexus-ui/i18n'
import { clsx } from 'clsx'
import { format, getDay, isSunday, Locale, parse, startOfWeek } from 'date-fns'
import { de, uk } from 'date-fns/locale'
import {
  Calendar as ReactBigCalendar,
  dateFnsLocalizer,
  DateHeaderProps,
  Event,
  HeaderProps,
  ToolbarProps,
  View,
  Views,
} from 'react-big-calendar'

import { MonthDateHeader, Toolbar } from '@/shared/ui'

import { CalendarViewHeader, SingleDayEvent } from './components'

interface CalendarProps {
  events: Event[]
  view: View
  onChangeView: (view: View) => void
  onChangeDate: (date: Date) => void
  selectedDate: Date
}

const locales = {
  de,
  en: uk,
}

const langToLocale: Record<SupportedLanguages, Locale> = {
  en: locales.en,
  de: locales.de,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
})

export const Calendar = ({ events, view, onChangeDate, onChangeView, selectedDate }: CalendarProps) => {
  const {
    i18n: { language },
  } = useTranslation()
  const lang = isSupportedLanguage(language) ? language : 'de'
  const currentLocale = langToLocale[lang]

  const isMonthView = view === 'month'
  const isWeekView = view === 'week'
  const isDayView = view === 'day'

  const handleDrillDown = (date: Date, view: View) => {
    const newView = view === 'day' ? Views.DAY : Views.WEEK

    onChangeDate(date)
    onChangeView(newView)
  }

  const getDayColumnProps = (date: Date) => {
    //TODO: add if public holiday
    if (isDayView) return {}
    const isOutOfWork = isSunday(date)
    let className = isOutOfWork ? 'bg-shade-100' : 'bg-shade-000'

    if (isWeekView && isOutOfWork) {
      className += ' week-view-out-of-work'
    }

    return { className }
  }

  return (
    <ReactBigCalendar
      className={clsx(
        'custom-calendar',
        isMonthView && 'custom-month-view',
        isDayView && 'custom-day-view',
        isWeekView && 'custom-week-view',
      )}
      events={events}
      localizer={localizer}
      culture={currentLocale.code}
      view={view}
      onView={onChangeView}
      startAccessor="start"
      endAccessor="end"
      onDrillDown={handleDrillDown}
      date={selectedDate}
      onNavigate={onChangeDate}
      dayPropGetter={getDayColumnProps}
      components={{
        toolbar: (props: ToolbarProps) => (
          <Toolbar {...props} view={view} headerText={format(selectedDate, 'MMMM yyyy', { locale: currentLocale })} />
        ),
        month: {
          dateHeader: (props: DateHeaderProps) => <MonthDateHeader {...props} />,
          header: CalendarViewHeader,
        },
        week: {
          event: SingleDayEvent,
          header: CalendarViewHeader,
        },
        day: {
          event: SingleDayEvent,
          header: (props: HeaderProps) => <CalendarViewHeader view="day" {...props} />,
        },
        timeSlotWrapper: () => null,
        timeGutterHeader: () => null,
        timeGutterWrapper: () => null,
      }}
      style={isMonthView ? { height: 'calc(100vh - 210px)' } : {}}
      allDayAccessor={() => true}
    />
  )
}
