import { createSlice } from '@reduxjs/toolkit'

import { LocationOverbookingEntity } from './types'

type LocationOverbookingSlice = {
  locationOverbooking: LocationOverbookingEntity | null
}

const initialState: LocationOverbookingSlice = {
  locationOverbooking: null,
}

export const locationOverbookingSlice = createSlice({
  name: 'locationOverbooking',
  initialState,
  reducers: {},
})
