import { createSlice } from '@reduxjs/toolkit'

import { countryApi } from '../api/countryApi'
import { CountryEntity } from './types'

type CountrySlice = {
  countries: CountryEntity[]
}

const initialState: CountrySlice = {
  countries: [],
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(countryApi.endpoints.GetCountries.matchFulfilled, (state: CountrySlice, { payload }) => {
      state.countries = payload
    })
  },
})

export const selectCountries = (state: RootState) => state.country.countries
