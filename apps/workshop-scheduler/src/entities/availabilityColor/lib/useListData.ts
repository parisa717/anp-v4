import { useAppSelector } from '@/shared/model'

import { useGetAvailabilityColorsQuery } from '../api/availabilityColorApi'
import { selectAvailabilityColors } from '../model/slice'

export const useAvailabilityColorsListData = () => {
  const queryResult = useGetAvailabilityColorsQuery()

  const availabilityColors = useAppSelector(selectAvailabilityColors)

  if (queryResult.isError) {
    //TODO: Add error handling
  }

  return {
    availabilityColors,
    ...queryResult,
  }
}
