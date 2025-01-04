import { useTranslation } from '@nexus-ui/i18n'
import { addDays, endOfMonth, format, formatISO, startOfMonth, subMinutes } from 'date-fns'
import { useMemo } from 'react'
import { Event } from 'react-big-calendar'
import { useParams } from 'react-router'

import { ServiceAdvisorCalendarEntry, useGetServiceAdvisorCalendarQuery } from '@/entities/locationServiceAdvisor'
import { CalendarEntryType } from '@/shared/api/types.generated'
import { IdParam } from '@/shared/lib'

type Props = {
  selectedDate: Date
}
export const useServiceAdvisorCalendar = ({ selectedDate }: Props) => {
  const { id: serviceAdvisorId = '' } = useParams<IdParam>()

  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.locationServiceAdvisor.calendar.${key}`)
  const toISODate = (date: Date) => formatISO(date, { representation: 'date' })
  const toISOHours = (date: Date) => format(date, 'HH:mm')

  const timeZoneOffset = new Date().getTimezoneOffset()

  const dateRange = useMemo(() => {
    const startDate = startOfMonth(selectedDate)
    const endDate = endOfMonth(selectedDate)
    return {
      startDate: { value: startDate, ISOString: toISODate(startDate) },
      endDate: { value: endDate, ISOString: toISODate(endDate) },
    }
  }, [selectedDate])

  const { data, isLoading, isError, isSuccess } = useGetServiceAdvisorCalendarQuery({
    startDate: dateRange.startDate.ISOString,
    endDate: dateRange.endDate.ISOString,
    id: serviceAdvisorId,
  })

  const entryTypeName: Record<CalendarEntryType, string> = {
    [CalendarEntryType.AdvisorAbsence]: translate('entryType.advisorAbsense'),
    [CalendarEntryType.AdvisorBreak]: translate('entryType.advisorBreak'),
    [CalendarEntryType.AdvisorBuffer]: translate('entryType.advisorBuffer'),
    [CalendarEntryType.PublicHoliday]: translate('entryType.publicHoliday'),
  }

  const createCalendarEvent = (entry: ServiceAdvisorCalendarEntry, id?: string, addDaysNo: number = 0) => {
    let startDate = entry.startDate ? new Date(entry.startDate) : undefined
    if (startDate) {
      const [startHours, startMinutes] = entry.startTime?.split(':') ?? '00:00'
      startDate = addDays(startDate, addDaysNo)
      startDate.setHours(+startHours)
      startDate.setMinutes(+startMinutes)

      startDate = subMinutes(startDate, timeZoneOffset)
    }

    let endDate = entry.endDate ? new Date(entry.endDate) : undefined
    if (endDate) {
      const [endHours, endMinutes] = entry.endTime?.split(':') ?? '23:59'
      endDate = addDays(endDate, addDaysNo)
      endDate.setHours(+endHours)
      endDate.setMinutes(+endMinutes)

      endDate = subMinutes(endDate, timeZoneOffset)
    }
    return {
      allDay: entry.isFullDay,
      end: endDate,
      start: startDate,
      title: '',
      resource: {
        id: id ?? entry.id,
        timeFrom: startDate ? toISOHours(startDate) : undefined,
        timeTo: endDate ? toISOHours(endDate) : undefined,
        eventTypeName: entryTypeName[entry.type],
      },
    }
  }

  const entries = data?.calendar?.entries ?? []
  const events = entries.reduce<Event[]>((allEvents, entry) => {
    const newEvents = []
    if (entry.period === 'NONE') {
      newEvents.push(createCalendarEvent(entry))
    } else {
      //Weekly period
      const periodInDays = 7
      const periodEndDate = entry.periodicEnd ? new Date(entry.periodicEnd) : undefined
      const dateLastDayOfMonth = endOfMonth(selectedDate).getDate()

      const lastDayOfPeriodEvent = //this assumes if there is no periodEndDate then the event has no due date. Ask if this assumption is true
        periodEndDate && periodEndDate < dateRange.endDate.value ? periodEndDate.getDate() : dateLastDayOfMonth
      const eventRepetitionsCount = Math.floor(lastDayOfPeriodEvent / periodInDays)

      for (let i = 0; i <= eventRepetitionsCount; i++) {
        newEvents.push(createCalendarEvent(entry, `${entry.id}-${i}`, i * periodInDays))
      }
    }

    return [...allEvents, ...newEvents]
  }, [])

  const workDays = (data?.workDays || []).map((workDay) => {
    let startDate = new Date(workDay.date)
    const [startHours, startMinutes] = workDay.startTime.split(':')
    startDate.setHours(+startHours)
    startDate.setMinutes(+startMinutes)

    startDate = subMinutes(startDate, timeZoneOffset)

    let endDate = new Date(workDay.date)
    const [endHours, endMinutes] = workDay.endTime.split(':')
    endDate.setHours(+endHours)
    endDate.setMinutes(+endMinutes)

    endDate = subMinutes(endDate, timeZoneOffset)

    return {
      startDate,
      endDate,
      date: new Date(workDay.date),
      dateString: workDay.date,
      endTime: toISOHours(endDate),
      startTime: toISOHours(startDate),
    }
  })

  return {
    events,
    workDays: workDays,
    dataStatus: {
      isLoading,
      isError,
      isSuccess,
    },
  }
}
