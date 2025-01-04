import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location } from 'react-router'

import { APPLICATION_MESSAGE_PAGE } from '../applicationMessage/types'

type RouterState = {
  currentRouterLocation: Location | null
  currentRouterPageUrl: APPLICATION_MESSAGE_PAGE | null
}

const initialState: RouterState = {
  currentRouterLocation: null,
  currentRouterPageUrl: null,
}

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    updateCurrentRouterLocation: (state, action: PayloadAction<Location>) => {
      state.currentRouterLocation = action.payload
    },
    updateCurrentRouterPageUrl: (state, action: PayloadAction<APPLICATION_MESSAGE_PAGE>) => {
      state.currentRouterPageUrl = action.payload
    },
  },
})

export const selectCurrentRouterLocationPathName = (state: RootState) => state.router.currentRouterLocation?.pathname

export const { updateCurrentRouterLocation, updateCurrentRouterPageUrl } = routerSlice.actions
