import { useMemo } from 'react'

import {
  useGetAdditionalBusinessStatusesByLocationQuery,
  useGetAdditionalBusinessStatusesQuery,
} from '@/entities/additionalBusinessStatus'
import { useGetBusinessStatusesByLocationQuery, useGetBusinessStatusesQuery } from '@/entities/businessStatus'
import { useGetCurrentLocation } from '@/entities/location'

export const useCreateBusinessStatusByLocationPageData = ({
  isAdditionalBusinessStatus,
}: {
  isAdditionalBusinessStatus: boolean
}) => {
  const {
    data: businessStatuses,
    isLoading: isBusinessStatusesLoading,
    isError: isBusinessStatusesError,
    isSuccess: isBusinessStatusesSuccess,
  } = useGetBusinessStatusesQuery(undefined, { skip: isAdditionalBusinessStatus })

  const {
    data: additionalBusinessStatuses,
    isLoading: isAdditionalBusinessStatusesLoading,
    isError: isAdditionalBusinessStatusesError,
    isSuccess: isAdditionalBusinessStatusesSuccess,
  } = useGetAdditionalBusinessStatusesQuery(undefined, { skip: !isAdditionalBusinessStatus })

  const locationId = useGetCurrentLocation()
  const {
    data: businessStatusesByLocation,
    isLoading: isBusinessStatusesByLocationLoading,
    isError: isBusinessStatusesByLocationError,
    isSuccess: isBusinessStatusesByLocationSuccess,
  } = useGetBusinessStatusesByLocationQuery({ id: locationId }, { skip: isAdditionalBusinessStatus })

  const {
    data: additionalBusinessStatusesByLocation,
    isLoading: isAdditionalBusinessStatusesByLocationLoading,
    isError: isAdditionalBusinessStatusesByLocationError,
    isSuccess: isAdditionalBusinessStatusesByLocationSuccess,
  } = useGetAdditionalBusinessStatusesByLocationQuery({ id: locationId }, { skip: !isAdditionalBusinessStatus })

  let isLoading

  if (isAdditionalBusinessStatus) {
    isLoading = isAdditionalBusinessStatusesByLocationLoading || isAdditionalBusinessStatusesLoading
  } else {
    isLoading = isBusinessStatusesByLocationLoading || isBusinessStatusesLoading
  }

  let notFound

  if (isAdditionalBusinessStatus) {
    notFound =
      (!isAdditionalBusinessStatusesByLocationLoading && !isAdditionalBusinessStatusesByLocationSuccess) ||
      (!isAdditionalBusinessStatusesLoading && !isAdditionalBusinessStatusesSuccess)
  } else {
    notFound =
      (!isBusinessStatusesByLocationLoading && !isBusinessStatusesByLocationSuccess) ||
      (!isBusinessStatusesLoading && !isBusinessStatusesSuccess)
  }

  let isError

  if (isAdditionalBusinessStatus) {
    isError = isAdditionalBusinessStatusesByLocationError || isAdditionalBusinessStatusesError
  } else {
    isError = isBusinessStatusesByLocationError || isBusinessStatusesError
  }

  if (isError) {
    //TODO: Add error handling
  }

  const statusesSelectBoxOptions = useMemo(() => {
    if (isAdditionalBusinessStatus) {
      if (!additionalBusinessStatuses || !additionalBusinessStatusesByLocation) return []

      return additionalBusinessStatuses
        .filter((status) => status.isActive)
        .filter((status) => !additionalBusinessStatusesByLocation.some((locStatus) => locStatus.id === status.id))
        .map((status) => ({
          value: status.id,
          label: status.name,
        }))
    } else {
      if (!businessStatuses || !businessStatusesByLocation) return []

      return businessStatuses
        .filter((status) => status.isActive)
        .filter((status) => !businessStatusesByLocation.some((locStatus) => locStatus.id === status.id))
        .map((status) => ({
          value: status.id,
          label: status.name,
        }))
    }
  }, [
    additionalBusinessStatuses,
    additionalBusinessStatusesByLocation,
    businessStatuses,
    businessStatusesByLocation,
    isAdditionalBusinessStatus,
  ])

  return {
    businessStatusesByLocation,
    businessStatuses,
    isLoading,
    notFound,
    statusesSelectBoxOptions,
  }
}
