import { createSlice } from '@reduxjs/toolkit'

import { additionalBusinessStatusApi } from '../api/additionalBusinessStatusApi'
import { AdditionalBusinessStatusEntity } from './types'

type AdditionalBusinessStatusSlice = {
  additionalBusinessStatuses: AdditionalBusinessStatusEntity[]
}

const initialState: AdditionalBusinessStatusSlice = {
  additionalBusinessStatuses: [],
}

export const additionalBusinessStatusSlice = createSlice({
  name: 'additionalBusinessStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      additionalBusinessStatusApi.endpoints.GetAdditionalBusinessStatuses.matchFulfilled,
      (state, { payload }) => {
        state.additionalBusinessStatuses = payload
      },
    )
  },
})
