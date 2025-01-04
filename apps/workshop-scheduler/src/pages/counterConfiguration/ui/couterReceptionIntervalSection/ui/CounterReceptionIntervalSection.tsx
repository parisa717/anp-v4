import { useState } from 'react'

import { useGetCurrentLocation } from '@/entities/location'
import { useGetLocationCounterQuery } from '@/entities/locationCounter'

import { LocationCounterEditForm } from './locationCounterEditForm/LocationCounterEditForm'
import { LocationCounterPreview } from './locationCounterPreview/LocationCounterPreview'

export const CounterReceptionIntervalSection = () => {
  const locationId = useGetCurrentLocation()

  const {
    data: locationCounterQueryData,
    isLoading: isLocationCounterQueryDataLoading,
    isError: hasLocationCounterQueryDataError,
  } = useGetLocationCounterQuery({
    locationId,
  })

  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditModeEnter = () => setIsEditMode(true)

  const handleEditModeExit = () => setIsEditMode(false)

  const counterReceptionInterval = locationCounterQueryData?.locationCounter.receptionInterval ?? 0

  // TODO add error/loading handling
  if (isLocationCounterQueryDataLoading) return <div>Loading...</div>
  if (hasLocationCounterQueryDataError || !counterReceptionInterval) return <div>Error occured!</div>

  return isEditMode ? (
    <LocationCounterEditForm counterReceptionInterval={counterReceptionInterval} onCancel={handleEditModeExit} />
  ) : (
    <LocationCounterPreview onEdit={handleEditModeEnter} counterReceptionInterval={counterReceptionInterval} />
  )
}
