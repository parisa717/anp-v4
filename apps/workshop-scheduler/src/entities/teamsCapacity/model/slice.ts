import { createSlice } from '@reduxjs/toolkit'

import { LocationTeamsCalendarEntity, TeamCapacityEntity } from './types'

type TeamCapacitySlice = {
  locationTeamsCalendar: LocationTeamsCalendarEntity | null
  teamCapacity: TeamCapacityEntity | null
}

const initialState: TeamCapacitySlice = {
  locationTeamsCalendar: null,
  teamCapacity: null,
}

export const teamCapacitySlice = createSlice({
  name: 'teamCapacity',
  initialState,
  reducers: {},
})
