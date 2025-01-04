import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import { ColorSetupListPage, EditColorSetupPage } from './lazyComponents'

export const colorSetupRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.ColorSetup.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.ColorSetup.Root} element={<ColorSetupListPage />} />
    <Route
      element={
        <PermissionLayout
          permissionsSet={[{ entity: 'colors', access: [PermissionType.Write] }]}
          pathToRelevantRoute={ROUTE_PATHS.ColorSetup.Root}
        />
      }
    >
      <Route path={ROUTE_PATHS.ColorSetup.Edit} element={<EditColorSetupPage />} />
    </Route>
  </Route>
)
