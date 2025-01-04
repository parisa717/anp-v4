import { createSlice } from '@reduxjs/toolkit'

import { areaApi } from '../api/areaApi'
import { AreaEntity } from './types'

type AreaSlice = {
  area: AreaEntity | null
}

const initialState: AreaSlice = {
  area: null,
}

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(areaApi.endpoints.GetArea.matchFulfilled, (state, { payload }) => {
      state.area = payload
    })
  },
})
