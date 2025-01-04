import { createSlice } from '@reduxjs/toolkit'

import { ListLocationWorkItemEntity, LocationWorkEntity } from './types'

type LocationWorksSlice = {
  locationWorks: ListLocationWorkItemEntity[]
  locationWork: LocationWorkEntity | null
}

const initialState: LocationWorksSlice = {
  locationWorks: [],
  locationWork: null,
}

export const locationWorksSlice = createSlice({
  name: 'LocationWorks',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
