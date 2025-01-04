import { useTranslation } from '@nexus-ui/i18n'
import { useState } from 'react'
import { useParams } from 'react-router'

import {
  LocationOverbookingEditForm,
  type LocationOverbookingForm,
  LocationOverbookingPreview,
  useGetLocationOverbookingQuery,
  useUpdateLocationMinimalOverbookingMutation,
} from '@/entities/locationOverbooking'
import { IdParam } from '@/shared/lib'

import { MinimalLocationOverbookingAppliedInfoModal } from './ui/MinimalLocationOverbookingAppliedInfoModal'

const MAX_CAPACITY_OVERBOOKING = 200
const MIN_CAPACITY_OVERBOOKING = 100

export const LocationOverbookingTab = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const { id = '' } = useParams<IdParam>()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.locationOverbooking.${key}`)

  const {
    data: locationOverbooking,
    isLoading: isLocationOverbookingLoading,
    isError: hasLocationOverbookingError,
  } = useGetLocationOverbookingQuery({
    locationId: id,
  })

  const [updateLocationMutate, { isLoading }] = useUpdateLocationMinimalOverbookingMutation()

  const capacityOverbookingValue = (locationOverbooking?.capacityOverbookingMultiplier || 0) * 100

  const handleExitModeExit = () => setIsEditMode(false)

  const handleExitModeEnter = () => setIsEditMode(true)

  const handleEditFormSubmit = async (data: LocationOverbookingForm) => {
    try {
      const minimumOverbookingMultiplier = Number(data.capacityOverbooking) / 100

      await updateLocationMutate({ locationId: id, minimumOverbookingMultiplier })
      setIsInfoModalOpen(true)
    } catch (_) {
      // TODO add error handling
    } finally {
      handleExitModeEnter()
    }
  }

  const handleInfoModalCancel = () => setIsInfoModalOpen(false)

  const handleInfoModalConfirm = () => {
    setIsInfoModalOpen(false)
    setIsEditMode(false)
  }

  // TODO add error/loading handling
  if (isLocationOverbookingLoading) return <div>Loading...</div>
  if (hasLocationOverbookingError) return <div>Error occured!</div>

  return (
    <section className="flex flex-col w-1/2 gap-3 max-w-3xl">
      <h2 data-cy="location-overbooking-title" className="text-3xl-regular-lineheight-150 text-bluegray-700">
        {translate('title')}
      </h2>
      <p data-cy="location-overbooking-description" className="text-xl lineheight-150 m-0">
        {translate('description')}
      </p>
      <div data-cy="location-overbooking-content" className="bg-root-surface-card p-7 rounded mt-2.5">
        {isEditMode ? (
          <LocationOverbookingEditForm
            minValue={MIN_CAPACITY_OVERBOOKING}
            maxValue={MAX_CAPACITY_OVERBOOKING}
            defaultValue={capacityOverbookingValue}
            onCancel={handleExitModeExit}
            onSubmit={handleEditFormSubmit}
            isLoading={isLoading}
          />
        ) : (
          <LocationOverbookingPreview
            minValue={MIN_CAPACITY_OVERBOOKING}
            maxValue={MAX_CAPACITY_OVERBOOKING}
            value={capacityOverbookingValue}
            onEdit={handleExitModeEnter}
          />
        )}
      </div>
      <MinimalLocationOverbookingAppliedInfoModal
        visible={isInfoModalOpen}
        onCancelClick={handleInfoModalCancel}
        onConfirmClick={handleInfoModalConfirm}
      />
    </section>
  )
}
