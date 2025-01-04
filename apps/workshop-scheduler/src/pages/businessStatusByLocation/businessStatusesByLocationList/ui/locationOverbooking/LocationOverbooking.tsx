import { useTranslation } from '@nexus-ui/i18n'
import { useState } from 'react'

import {
  LocationOverbookingEditForm,
  LocationOverbookingForm,
  LocationOverbookingPreview,
  useGetLocationOverbookingQuery,
  useUpdateLocationOverbookingMutation,
} from '@/entities/locationOverbooking'

import { LocationOverbookingCapacity } from '../../model'

type Props = {
  type: LocationOverbookingCapacity
  locationId: string
  isEditingDisabled: boolean
  onChangeEditedType: (type: LocationOverbookingCapacity | null) => void
}
const MAX_LOCATION_OVERBOOKING = 200

const headerTitle: Record<LocationOverbookingCapacity, string> = {
  [LocationOverbookingCapacity.Maximum]: 'pages.businessStatusByLocation.locationOverbooking.maximumLevel.title',
  [LocationOverbookingCapacity.Warning]: 'pages.businessStatusByLocation.locationOverbooking.warning.title',
}

export const LocationOverbooking = ({ type, locationId, isEditingDisabled, onChangeEditedType }: Props) => {
  const { t } = useTranslation()
  const {
    data,
    isError: isGetLocationOverbookingError,
    isLoading: isGetLocationOverbookingLoading,
    isSuccess: isGetLocationOverbookingSuccess,
  } = useGetLocationOverbookingQuery({ locationId })
  const [updateLocationOverbooking, { isLoading: isUpdateLocationOverbookingLoading }] =
    useUpdateLocationOverbookingMutation()

  const [isEditing, setIsEditing] = useState(false)

  const handleCloseEditing = () => {
    setIsEditing(false)
    onChangeEditedType(null)
  }
  const handleOpenEditing = () => {
    setIsEditing(true)
    onChangeEditedType(type)
  }

  // "TODO: Add proper error/loading handling"
  if (isGetLocationOverbookingError) return <div>{t('error')}</div>
  if (isGetLocationOverbookingLoading) return <div>{t('loading')}</div>
  if (!isGetLocationOverbookingSuccess) return null

  const locationOverbookingData = {
    minimumOverbooking: data.minimumOverbookingMultiplier * 100,
    capacityOverbooking: data.capacityOverbookingMultiplier * 100,
    maxCapacity: data.maxCapacityMultiplier * 100,
  }

  const handleSubmit = async (formData: LocationOverbookingForm) => {
    try {
      if (type === LocationOverbookingCapacity.Maximum) {
        await updateLocationOverbooking({
          locationId,
          capacityOverbookingMultiplier: data.capacityOverbookingMultiplier,
          maxCapacityMultiplier: formData.capacityOverbooking / 100,
        })
      }
      if (type === LocationOverbookingCapacity.Warning) {
        await updateLocationOverbooking({
          locationId,
          capacityOverbookingMultiplier: formData.capacityOverbooking / 100,
          maxCapacityMultiplier: data.maxCapacityMultiplier,
        })
      }
    } catch {
      // TODO add error handling
    } finally {
      handleCloseEditing()
    }
  }

  const minValue: Record<LocationOverbookingCapacity, number> = {
    [LocationOverbookingCapacity.Maximum]: locationOverbookingData.capacityOverbooking,
    [LocationOverbookingCapacity.Warning]: locationOverbookingData.minimumOverbooking,
  }

  const value: Record<LocationOverbookingCapacity, number> = {
    [LocationOverbookingCapacity.Maximum]: locationOverbookingData.maxCapacity,
    [LocationOverbookingCapacity.Warning]: locationOverbookingData.capacityOverbooking,
  }

  return (
    <div className="flex flex-col gap-4  basis-1/2">
      <h3 className="text-3xl text-bluegray-700 m-0 font-normal">{t(headerTitle[type])}</h3>
      <div className="p-5 bg-surface-0 rounded-sm" data-cy="location-overbooking">
        {isEditing ? (
          <LocationOverbookingEditForm
            maxValue={MAX_LOCATION_OVERBOOKING}
            minValue={minValue[type]}
            defaultValue={value[type]}
            onCancel={handleCloseEditing}
            onSubmit={handleSubmit}
            isLoading={isUpdateLocationOverbookingLoading}
          />
        ) : (
          <LocationOverbookingPreview
            maxValue={MAX_LOCATION_OVERBOOKING}
            minValue={minValue[type]}
            value={value[type]}
            onEdit={handleOpenEditing}
            isEditingDisabled={isEditingDisabled}
          />
        )}
      </div>
    </div>
  )
}
