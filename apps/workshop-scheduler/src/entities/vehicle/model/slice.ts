import { createSlice } from '@reduxjs/toolkit'

import { VehicleEntity } from './types'

type VehicleSlice = {
  vehicle: VehicleEntity | null
}

const initialState: VehicleSlice = {
  vehicle: null,
}

export const vehicleSlice = createSlice({
  name: 'Vehicle',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
