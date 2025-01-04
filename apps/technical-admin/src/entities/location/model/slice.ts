import { createSlice } from '@reduxjs/toolkit'

import { LocationEntity } from './types'

type LocationSlice = {
  locations: LocationEntity[]
}

const initialState: LocationSlice = {
  locations: [],
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
