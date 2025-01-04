import { createContext, useContext } from 'react'

import { PermissionType } from '@/shared/api/types.generated'

import { PermissionEntity } from '../model/types'

export type PermissionSet = {
  entity: string
  access: PermissionType[]
}

type PermissionContextType = {
  permissions: PermissionEntity[]
  hasPermissions: (permissionsSet: PermissionSet[]) => boolean
}

export const PermissionContext = createContext<PermissionContextType | null>(null)

export const usePermissions = () => {
  const context = useContext(PermissionContext)
  if (!context) throw new Error('usePermissions must be used within PermissionProvider')
  return context
}
