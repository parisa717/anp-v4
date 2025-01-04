import { createSlice } from '@reduxjs/toolkit'

import { businessStatusApi } from '../api/businessStatusApi'
import { BusinessStatusEntity } from './types'

type BusinessStatusSlice = {
  businessStatuses: BusinessStatusEntity[]
}

const initialState: BusinessStatusSlice = {
  businessStatuses: [],
}

export const businessStatusSlice = createSlice({
  name: 'businessStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(businessStatusApi.endpoints.GetBusinessStatuses.matchFulfilled, (state, { payload }) => {
      state.businessStatuses = payload
    })
  },
})
