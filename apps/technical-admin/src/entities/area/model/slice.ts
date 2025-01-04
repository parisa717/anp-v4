import { createSlice } from '@reduxjs/toolkit'

import { areaApi } from '../api/areaApi'
import { AreaEntity } from './types'

type AreaSlice = {
  areas: AreaEntity[]
}

const initialState: AreaSlice = {
  areas: [],
}

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(areaApi.endpoints.GetAreas.matchFulfilled, (state: AreaSlice, { payload }) => {
      state.areas = payload
    })
  },
})

export const selectAreas = (state: RootState) => state.area.areas
