import { useTranslation } from '@nexus-ui/i18n'
import clsx from 'clsx'
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMinutes } from 'date-fns'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'
import { SyntheticEvent, useMemo, useRef, useState } from 'react'
import { Event, View } from 'react-big-calendar'
import { useParams } from 'react-router'

import { useGetServiceAdvisorCalendarQuery } from '@/entities/locationServiceAdvisor'
import { CalendarEntryPeriodEnum, CalendarEntryTypeEnum } from '@/shared/api/types.generated'
import { IdParam } from '@/shared/lib'

import {
  dataDisplayClassName,
  titleClassName,
  toDateDisplay,
  toHours,
  toISODate,
  toTimeRange,
  useCurrentLocale,
} from '../../../lib'
import { CalendarEntryBufferAppointmentEdit } from '../../serviceAdvisorCalendar/entryDetails/bufferAppointment/edit/CalendarEntryBufferAppointmentEdit'

type Props = {
  selectedDate: Date
  currentView: View
}

type BufferAppointmentData = {
  id: string
  period: CalendarEntryPeriodEnum
  date: string | undefined
  dateDisplay: string | undefined
  endTime: string | undefined
  startTime: string | undefined
  periodicEnd: string | undefined
}

const bufferAppointmentClassName = clsx(dataDisplayClassName, `!mb-0`)

export const ServiceAdvisorBufferAppointments = ({ selectedDate, currentView }: Props) => {
  const { id: serviceAdvisorId = '' } = useParams<IdParam>()
  const { currentLocale } = useCurrentLocale()
  const { t } = useTranslation()
  const overlayRef = useRef<OverlayPanel>(null)

  const [selectedBufferAppoinment, setSelectedBufferAppointment] = useState<Event>({})
  const translate = (key: string) => t(`pages.locationServiceAdvisor.details.bufferAppointments.${key}`)

  const timeZoneOffset = new Date().getTimezoneOffset()

  const toWeekDayName = (date: string) => format(date, 'EEEE', { locale: currentLocale })

  const handleShowDetails = (e: SyntheticEvent, bufferAppointment: BufferAppointmentData) => {
    overlayRef.current?.show(e, e.target)
    setSelectedBufferAppointment({
      allDay: false,
      end: bufferAppointment.date ? new Date(bufferAppointment.date) : undefined,
      resource: {
        id: bufferAppointment.id,
        startTime: bufferAppointment.startTime,
        endTime: bufferAppointment.endTime,
        period: bufferAppointment.period,
        periodicEnd: bufferAppointment.periodicEnd,
      },
      start: bufferAppointment.date ? new Date(bufferAppointment.date) : undefined,
    })
  }
  const handleCloseDetails = () => {
    overlayRef.current?.hide()
  }

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
          result.data?.calendar.entries.filter((entry) => entry.type === CalendarEntryTypeEnum.AdvisorBuffer) ?? []
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
            periodicEnd: entry.periodicEnd ?? undefined,
          }
        }),
      }),
    },
  )

  /*TODO add error/loading handling*/
  if (isGetServiceAdvisorCalendarError) return <div>Error...</div>
  if (isGetServiceAdvisorCalendarLoading) return <div>Loading...</div>
  if (!isGetServiceAdvisorCalendarSuccess) return null

  const showDetailsButton = (bufferAppointment: BufferAppointmentData) => (
    <Button
      rounded
      text
      icon="pi pi-pencil"
      aria-label={t('edit')}
      severity="info"
      onClick={(e) => handleShowDetails(e, bufferAppointment)}
    />
  )
  return (
    <>
      <p className={titleClassName}>{translate('title')}</p>
      {bufferAppointments.length === 0 && <p className={dataDisplayClassName}>-</p>}
      {bufferAppointments.map((bufferAppointment) => {
        if (!bufferAppointment.date) return null
        if (bufferAppointment.period === CalendarEntryPeriodEnum.Weekly) {
          return (
            <div key={bufferAppointment.id}>
              <p className={bufferAppointmentClassName}>
                {`${toWeekDayName(bufferAppointment.date)}, ${toTimeRange(bufferAppointment)},`}
              </p>
              <div className="flex items-center gap-2">
                <p className={bufferAppointmentClassName}>{translate('weekly')}</p>
                {showDetailsButton(bufferAppointment)}
              </div>
            </div>
          )
        }
        return (
          <div key={bufferAppointment.id}>
            <p className={bufferAppointmentClassName}>
              {toWeekDayName(bufferAppointment.date)}, {bufferAppointment.dateDisplay},
            </p>
            <div className="flex items-center gap-2">
              <p className={bufferAppointmentClassName}>{toTimeRange(bufferAppointment)}</p>
              {showDetailsButton(bufferAppointment)}
            </div>
          </div>
        )
      })}
      <OverlayPanel ref={overlayRef} pt={{ content: { className: 'p-0' } }}>
        <CalendarEntryBufferAppointmentEdit
          entry={selectedBufferAppoinment}
          onCancel={handleCloseDetails}
          onSave={handleCloseDetails}
        />
      </OverlayPanel>
    </>
  )
}
