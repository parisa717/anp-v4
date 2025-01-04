import { ReactNode } from 'react'

import { PermissionProvider, useGetUserPermissionsQuery } from '@/entities/permission'

interface Props {
  children: ReactNode
}

export const PermissionGate = ({ children }: Props) => {
  const { data: permissions, isError, isLoading } = useGetUserPermissionsQuery({ id: 'test' })

  if (isError) {
    // TODO: Add proper error handling
    console.error('Error fetching user permissions')
  }

  if (isLoading) return null

  return <PermissionProvider permissions={permissions ?? []}>{children}</PermissionProvider>
}
