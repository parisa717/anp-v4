import { createSlice } from '@reduxjs/toolkit'

import { CustomerEntity } from './types'

type CustomerSlice = {
  customer: CustomerEntity | null
}

const initialState: CustomerSlice = {
  customer: null,
}

export const customerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
