import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { locationApi } from '../api/locationApi'
import { LocationEntity } from './types'

type LocationSlice = {
  locations: LocationEntity[]
  currentLocation?: LocationEntity
}

const initialState: LocationSlice = {
  locations: [],
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<LocationEntity>) => {
      state.currentLocation = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(locationApi.endpoints.GetLocations.matchFulfilled, (state, { payload }) => {
      state.locations = payload
    })
  },
})

export const { setCurrentLocation } = locationSlice.actions

export const selectCurrentLocation = (state: RootState) => state.location.currentLocation
