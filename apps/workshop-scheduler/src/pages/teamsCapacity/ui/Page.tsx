import { useTranslation } from '@nexus-ui/i18n'
import { endOfMonth, endOfWeek, formatISO, startOfMonth, startOfWeek } from 'date-fns'
import { useMemo, useState } from 'react'
import { View } from 'react-big-calendar'

import { useGetCurrentLocation } from '@/entities/location'
import { useGetLocationTeamsCalendarQuery } from '@/entities/teamsCapacity'

import { Calendar } from './calendar/Calendar'
import { CalendarFilters } from './calendarFilters'
import { TeamsCapacityList } from './teamsCapacityList'

const toISODate = (date: Date) => formatISO(date, { representation: 'date' })

const TeamsCapacityPage = () => {
  const [currentView, setCurrentView] = useState<View>('month')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [filters, setFilters] = useState<string[]>([])

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.teamsCapacity.${key}`)

  const locationId = useGetCurrentLocation()

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
    data: locationTeamsCalendarQueryData,
    isLoading: isLocationTeamsCalendarQueryLoading,
    isError: hasLocationTeamsCalendarQueryError,
  } = useGetLocationTeamsCalendarQuery(
    { locationId, startDate: dateRange.startDateISOString, endDate: dateRange.endDateISOString },
    {
      selectFromResult: (result) => ({
        ...result,
        data: {
          events:
            result.data?.days.map((day) => ({
              ...day,
              start: new Date(day.date || Date.now()),
              end: new Date(day.date || Date.now()),
            })) || [],
        },
      }),
    },
  )

  // TODO add error/loading handling
  if (isLocationTeamsCalendarQueryLoading) return <div>Loading...</div>
  if (hasLocationTeamsCalendarQueryError) return <div>Error occured!</div>

  const filteredEvents = locationTeamsCalendarQueryData.events
    .filter((event) => event.capacities.some((capacity) => filters.includes(capacity.qualificationName)))
    .map((event) => ({
      ...event,
      title: (
        <TeamsCapacityList
          startDate={event.start}
          capacities={event.capacities.filter((capacity) => filters.includes(capacity.qualificationName))}
        />
      ),
    }))

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>
      <CalendarFilters setFilters={setFilters} filters={filters} />
      <Calendar
        onChangeView={setCurrentView}
        onChangeDate={setSelectedDate}
        selectedDate={selectedDate}
        events={filteredEvents}
        view={currentView}
      />
    </main>
  )
}

export default TeamsCapacityPage
