import { useState } from 'react'

import { useGetCurrentLocation } from '@/entities/location'
import { useGetLocationCounterCalendarQuery } from '@/entities/locationCounterCalendar'

import { LocationCounterCalendarEditForm } from './locationCounterCalendarEditForm'
import { LocationCounterCalendarPreview } from './locationCounterCalendarPreview'

export const CounterCalendarSection = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const locationId = useGetCurrentLocation()

  const { data: locationCounterCalendarQueryData, isLoading: isLocationCounterCalendarQueryDataLoading } =
    useGetLocationCounterCalendarQuery({ locationId })

  const handleEditModeEnter = () => setIsEditMode(true)

  const handleEditModeExit = () => setIsEditMode(false)

  const workDaysData = locationCounterCalendarQueryData?.workDays ?? []

  return (
    <section className="flex flex-col basis-1/2" data-cy="counter-calendar-section">
      {isEditMode ? (
        <LocationCounterCalendarEditForm onCancel={handleEditModeExit} workDaysData={workDaysData} />
      ) : (
        <LocationCounterCalendarPreview
          workDaysData={workDaysData}
          onEdit={handleEditModeEnter}
          isWorkDaysDataLoading={isLocationCounterCalendarQueryDataLoading}
        />
      )}
    </section>
  )
}
