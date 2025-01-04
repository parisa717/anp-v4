import { Navigate, Outlet } from 'react-router'

import { PermissionSet, usePermissions } from '../lib/PermissionContext'

interface Props {
  permissionsSet: PermissionSet[]
  pathToRelevantRoute: string
}

export const PermissionLayout = ({ permissionsSet, pathToRelevantRoute }: Props) => {
  const { hasPermissions } = usePermissions()

  if (!hasPermissions(permissionsSet)) {
    return Navigate({ to: pathToRelevantRoute })
  }

  return <Outlet />
}
