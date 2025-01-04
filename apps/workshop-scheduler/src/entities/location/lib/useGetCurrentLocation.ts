import { selectCurrentLocation } from '@/entities/location'
import { useAppSelector } from '@/shared/model'

export const useGetCurrentLocation = () => {
  const currentLocation = useAppSelector(selectCurrentLocation)

  return currentLocation?.id || ''
}
