import { createSlice } from '@reduxjs/toolkit'

import { QualificationEntity } from './types'

type QualificationSlice = {
  qualifications: QualificationEntity[]
}

const initialState: QualificationSlice = {
  qualifications: [],
}

export const qualificationSlice = createSlice({
  name: 'Qualification',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
