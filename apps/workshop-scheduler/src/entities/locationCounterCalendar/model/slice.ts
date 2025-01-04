import { createSlice } from '@reduxjs/toolkit'

import { LocationCounterCalendarWorkDayEntity } from './types'

type LocationCounterCalendarSlice = {
  workDays: LocationCounterCalendarWorkDayEntity[]
}

const initialState: LocationCounterCalendarSlice = {
  workDays: [],
}

export const locationCounterCalendarSlice = createSlice({
  name: 'locationCounterCalendar',
  initialState,
  reducers: {},
})
