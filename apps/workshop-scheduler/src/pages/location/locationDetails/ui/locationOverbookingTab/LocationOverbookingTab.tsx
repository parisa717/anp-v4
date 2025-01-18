import { useTranslation } from '@nexus-ui/i18n'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useState } from 'react'
import { useParams } from 'react-router'

import {
  LocationOverbookingEditForm,
  type LocationOverbookingForm,
  LocationOverbookingPreview,
  useGetLocationOverbookingQuery,
  useUpdateLocationMinimalOverbookingMutation,
} from '@/entities/locationOverbooking'
import { IdParam, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { MinimalLocationOverbookingAppliedInfoModal } from './ui/MinimalLocationOverbookingAppliedInfoModal'

const MAX_CAPACITY_OVERBOOKING = 200
const MIN_CAPACITY_OVERBOOKING = 100

export const LocationOverbookingTab = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const { id = '' } = useParams<IdParam>()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.locationOverbooking.${key}`)

  const { data: locationOverbooking, isLoading: isLocationOverbookingLoading } = useGetLocationOverbookingQuery({
    locationId: id,
  })

  const [updateLocationMutate, { isLoading: isUpdateLocationOverbookingLoading }] =
    useUpdateLocationMinimalOverbookingMutation()

  const capacityOverbookingValue = (locationOverbooking?.capacityOverbookingMultiplier || 0) * 100

  const handleEditModeExit = () => setIsEditMode(false)

  const handleEditModeEnter = () => setIsEditMode(true)

  const handleEditFormSubmit = async (data: LocationOverbookingForm) => {
    const minimumOverbookingMultiplier = Number(data.capacityOverbooking) / 100

    const result = await updateLocationMutate({ locationId: id, minimumOverbookingMultiplier })

    if (result.data && !result.error) {
      setIsInfoModalOpen(true)
      handleEditModeExit()
    }
  }

  const handleInfoModalCancel = () => setIsInfoModalOpen(false)

  const handleInfoModalConfirm = () => {
    setIsInfoModalOpen(false)
    setIsEditMode(false)
  }

  return (
    <section className="flex flex-col w-1/2 gap-3 max-w-3xl">
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.Location.Details.Root} className="mb-8" />
      <h2 data-cy="location-overbooking-title" className="text-3xl-regular-lineheight-150 text-bluegray-700">
        {translate('title')}
      </h2>
      <p data-cy="location-overbooking-description" className="text-xl lineheight-150 m-0">
        {translate('description')}
      </p>
      <div data-cy="location-overbooking-content" className="bg-root-surface-card p-7 rounded mt-2.5">
        {isEditMode ? (
          isLocationOverbookingLoading ? (
            <ProgressSpinner
              className="w-full overflow-hidden h-14"
              pt={{
                spinner: {
                  className: 'size-14',
                },
              }}
            />
          ) : (
            <LocationOverbookingEditForm
              minValue={MIN_CAPACITY_OVERBOOKING}
              maxValue={MAX_CAPACITY_OVERBOOKING}
              defaultValue={capacityOverbookingValue}
              onCancel={handleEditModeExit}
              onSubmit={handleEditFormSubmit}
              isLoading={isUpdateLocationOverbookingLoading}
            />
          )
        ) : (
          <LocationOverbookingPreview
            minValue={MIN_CAPACITY_OVERBOOKING}
            maxValue={MAX_CAPACITY_OVERBOOKING}
            value={capacityOverbookingValue}
            onEdit={handleEditModeEnter}
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
