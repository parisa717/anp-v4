import { ProgressSpinner } from 'primereact/progressspinner'
import { useState } from 'react'

import { useGetCurrentLocation } from '@/entities/location'
import { useGetLocationCounterQuery } from '@/entities/locationCounter'

import { LocationCounterEditForm } from './locationCounterEditForm/LocationCounterEditForm'
import { LocationCounterPreview } from './locationCounterPreview/LocationCounterPreview'

export const CounterReceptionIntervalSection = () => {
  const locationId = useGetCurrentLocation()

  const { data: locationCounterQueryData, isLoading: isLocationCounterQueryDataLoading } = useGetLocationCounterQuery({
    locationId,
  })

  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditModeEnter = () => setIsEditMode(true)

  const handleEditModeExit = () => setIsEditMode(false)

  const counterReceptionInterval = locationCounterQueryData?.receptionInterval ?? 0

  if (!counterReceptionInterval) return null

  return (
    <>
      {isLocationCounterQueryDataLoading ? (
        <ProgressSpinner
          className="w-full overflow-hidden h-14"
          pt={{
            spinner: {
              className: 'size-14',
            },
          }}
        />
      ) : isEditMode ? (
        <LocationCounterEditForm counterReceptionInterval={counterReceptionInterval} onCancel={handleEditModeExit} />
      ) : (
        <LocationCounterPreview onEdit={handleEditModeEnter} counterReceptionInterval={counterReceptionInterval} />
      )}
    </>
  )
}
