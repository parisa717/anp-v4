import { createSlice } from '@reduxjs/toolkit'

import { LocationCounterEntity } from './types'

type LocationOverbookingSlice = {
  locationCounter: LocationCounterEntity | null
}

const initialState: LocationOverbookingSlice = {
  locationCounter: null,
}

export const locationCounterSlice = createSlice({
  name: 'locationCounter',
  initialState,
  reducers: {},
})
