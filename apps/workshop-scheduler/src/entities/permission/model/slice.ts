import { createSlice } from '@reduxjs/toolkit'

import { PermissionEntity } from './types'

type PermissionSlice = {
  permissions: PermissionEntity[]
}

const initialState: PermissionSlice = {
  permissions: [],
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers: () => {},
})
