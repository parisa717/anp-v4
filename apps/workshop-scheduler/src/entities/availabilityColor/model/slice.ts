import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { availabilityColorApi } from '../api/availabilityColorApi'
import { AvailabilityColorEntity } from './types'

type AvailabilityColorSlice = {
  availabilityColors: AvailabilityColorEntity[]
}

const initialState: AvailabilityColorSlice = {
  availabilityColors: [],
}

export const availabilityColorSlice = createSlice({
  name: 'availabilityColor',
  initialState,
  reducers: {
    addAvailabilityColor: (state, action: PayloadAction<AvailabilityColorEntity>) => {
      state.availabilityColors.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(availabilityColorApi.endpoints.GetAvailabilityColors.matchFulfilled, (state, { payload }) => {
      state.availabilityColors = payload
    })
  },
})

export const { addAvailabilityColor } = availabilityColorSlice.actions
export const selectAvailabilityColors = (state: RootState) => state.availabilityColor.availabilityColors
