import { createSlice } from '@reduxjs/toolkit'

import { WorkEntity } from './types'

type WorkSlice = {
  works: WorkEntity[]
  work: WorkEntity | null
}

const initialState: WorkSlice = {
  works: [],
  work: null,
}

export const workSlice = createSlice({
  name: 'Work',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
