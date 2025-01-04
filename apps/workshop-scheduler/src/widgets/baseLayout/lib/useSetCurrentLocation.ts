import { useEffect } from 'react'

import { setCurrentLocation, useGetLocationsQuery } from '@/entities/location'
import { useAppDispatch } from '@/shared/model'

export const useSetCurrentLocation = () => {
  const isLoggedIn = true //TODO: Use proper data after login system will be implemented
  const dispatch = useAppDispatch()

  //TODO: Add error handling
  const { data: locations } = useGetLocationsQuery(undefined, {
    skip: !isLoggedIn,
  })

  useEffect(() => {
    if (locations?.length) {
      dispatch(setCurrentLocation(locations[0]))
    }
  }, [dispatch, locations])
}
