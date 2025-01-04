import { createSlice } from '@reduxjs/toolkit'

import { ServiceAdvisorCalendar, ServiceAdvisorEntity } from './types'

type LocationServiceAdvisorSlice = {
  locationServiceAdvisors: ServiceAdvisorEntity[]
  serviceAdvisor: ServiceAdvisorEntity | null
  serviceAdvisorCalendar: ServiceAdvisorCalendar | null
}

const initialState: LocationServiceAdvisorSlice = {
  locationServiceAdvisors: [],
  serviceAdvisor: null,
  serviceAdvisorCalendar: null,
}

export const locationServiceAdvisorSlice = createSlice({
  name: 'locationServiceAdvisor',
  initialState,
  reducers: {},
})
