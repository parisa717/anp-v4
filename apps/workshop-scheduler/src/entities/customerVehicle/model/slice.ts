import { createSlice } from '@reduxjs/toolkit'

import { CustomerVehicleEntity } from './types'

type CustomerVehicleSlice = {
  customerVehicles: CustomerVehicleEntity[]
}

const initialState: CustomerVehicleSlice = {
  customerVehicles: [],
}

export const customerVehicleSlice = createSlice({
  name: 'CustomerVehicle',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
