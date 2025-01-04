import { useTranslation } from '@nexus-ui/i18n'
import clsx from 'clsx'
import { endOfMonth, endOfWeek, format, formatISO, startOfMonth, startOfWeek, subMinutes } from 'date-fns'
import { useMemo } from 'react'
import { View } from 'react-big-calendar'
import { useParams } from 'react-router'

import { useGetServiceAdvisorCalendarQuery } from '@/entities/locationServiceAdvisor'
import { CalendarEntryPeriod, CalendarEntryType } from '@/shared/api/types.generated'
import { IdParam } from '@/shared/lib'

import { dataDisplayClassName, titleClassName, useCurrentLocale } from '../../../lib'

type Props = {
  selectedDate: Date
  currentView: View
}

const toISODate = (date: Date) => formatISO(date, { representation: 'date' })
const toHours = (date: Date) => format(date, 'HH:mm')
const toDateDisplay = (date: Date) => format(date, 'dd-MM-yyyy')
const toTimeRange = (entry: { startTime: string | undefined; endTime: string | undefined }) =>
  `${entry.startTime}-${entry.endTime}`

export const ServiceAdvisorBufferAppointments = ({ selectedDate, currentView }: Props) => {
  const { id: serviceAdvisorId = '' } = useParams<IdParam>()
  const { currentLocale } = useCurrentLocale()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.locationServiceAdvisor.details.bufferAppointments.${key}`)

  const timeZoneOffset = new Date().getTimezoneOffset()

  const toWeekDayName = (date: string) => format(date, 'EEEE', { locale: currentLocale })

  const dateRange = useMemo(() => {
    let startDate = selectedDate
    let endDate = selectedDate
    if (currentView === 'month') {
      startDate = startOfMonth(startDate)
      endDate = endOfMonth(endDate)
    }
    if (currentView === 'week') {
      startDate = startOfWeek(startDate, { weekStartsOn: 1 })
      endDate = endOfWeek(endDate, { weekStartsOn: 1 })
    }
    return {
      startDateISOString: toISODate(startDate),
      endDateISOString: toISODate(endDate),
    }
  }, [selectedDate, currentView])

  const {
    data: bufferAppointments,
    isLoading: isGetServiceAdvisorCalendarLoading,
    isError: isGetServiceAdvisorCalendarError,
    isSuccess: isGetServiceAdvisorCalendarSuccess,
  } = useGetServiceAdvisorCalendarQuery(
    {
      startDate: dateRange.startDateISOString,
      endDate: dateRange.endDateISOString,
      id: serviceAdvisorId,
    },
    {
      selectFromResult: (result) => ({
        ...result,
        data: (
          result.data?.calendar.entries.filter((entry) => entry.type === CalendarEntryType.AdvisorBuffer) ?? []
        ).map((entry) => {
          let startDate = entry.startDate ? new Date(entry.startDate) : undefined
          if (startDate) {
            const [startHours, startMinutes] = entry.startTime?.split(':') ?? '00:00'
            startDate.setHours(+startHours)
            startDate.setMinutes(+startMinutes)

            startDate = subMinutes(startDate, timeZoneOffset)
          }

          let endDate = entry.endDate ? new Date(entry.endDate) : undefined
          if (endDate) {
            const [endHours, endMinutes] = entry.endTime?.split(':') ?? '23:59'
            endDate.setHours(+endHours)
            endDate.setMinutes(+endMinutes)

            endDate = subMinutes(endDate, timeZoneOffset)
          }

          return {
            id: entry.id,
            period: entry.period,
            date: startDate ? toISODate(startDate) : undefined,
            dateDisplay: startDate ? toDateDisplay(startDate) : undefined,
            endTime: endDate ? toHours(endDate) : undefined,
            startTime: startDate ? toHours(startDate) : undefined,
          }
        }),
      }),
    },
  )

  /*TODO add error/loading handling*/
  if (isGetServiceAdvisorCalendarError) return <div>Error...</div>
  if (isGetServiceAdvisorCalendarLoading) return <div>Loading...</div>
  if (!isGetServiceAdvisorCalendarSuccess) return null

  return (
    <>
      <p className={titleClassName}>{translate('title')}</p>
      {bufferAppointments.length === 0 && <p className={dataDisplayClassName}>-</p>}
      {bufferAppointments.map((bufferAppointment) => {
        if (!bufferAppointment.date) return null
        if (bufferAppointment.period === CalendarEntryPeriod.Weekly) {
          return (
            <p className={dataDisplayClassName} key={bufferAppointment.id}>
              {`${toWeekDayName(bufferAppointment.date)}, ${toTimeRange(bufferAppointment)}, ${translate('weekly')}`}
            </p>
          )
        }
        return (
          <div key={bufferAppointment.id}>
            <p className={clsx(dataDisplayClassName, `!mb-0`)}>
              {toWeekDayName(bufferAppointment.date)}, {bufferAppointment.dateDisplay},
            </p>
            <p className={dataDisplayClassName}>{toTimeRange(bufferAppointment)}</p>
          </div>
        )
      })}
    </>
  )
}
