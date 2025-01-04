import { createSlice } from '@reduxjs/toolkit'

import { brandApi } from '../api/brandApi'
import { BrandEntity } from './types'

type BrandSlice = {
  brands: BrandEntity[]
  currentBrand?: BrandEntity
}

const initialState: BrandSlice = {
  brands: [],
}

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(brandApi.endpoints.GetBrands.matchFulfilled, (state: BrandSlice, { payload }) => {
      state.brands = payload
    })
  },
})
