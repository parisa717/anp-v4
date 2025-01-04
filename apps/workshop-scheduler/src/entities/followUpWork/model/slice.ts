import { createSlice } from '@reduxjs/toolkit'

import { FollowUpWorkEntity } from './types'

type FollowUpWorkSlice = {
  works: FollowUpWorkEntity[]
  work: FollowUpWorkEntity | null
}

const initialState: FollowUpWorkSlice = {
  works: [],
  work: null,
}

export const followUpWorkSlice = createSlice({
  name: 'FollowUpWork',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
