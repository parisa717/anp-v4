import { ReactNode } from 'react'

import { PermissionEntity } from '../model/types'
import { PermissionContext, PermissionSet } from './PermissionContext'

interface Props {
  children: ReactNode
  permissions: PermissionEntity[]
}

export const PermissionProvider = ({ children, permissions }: Props) => {
  const hasPermissions = (requiredPermissions: PermissionSet[]) => {
    return requiredPermissions?.every(({ entity, access: requiredAccess }) => {
      const userPermission = permissions?.find((permission) => permission.name === entity)
      if (!userPermission) return false

      return requiredAccess.every((type) => userPermission.access.includes(type))
    })
  }

  return (
    <PermissionContext.Provider value={{ permissions: permissions ?? [], hasPermissions }}>
      {children}
    </PermissionContext.Provider>
  )
}
