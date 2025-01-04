import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { ROUTE_PATHS } from '@/shared/lib'

import { CounterConfigurationPage } from './lazyComponents'

export const counterConfigurationRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.CounterConfiguration.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.CounterConfiguration.Root} element={<CounterConfigurationPage />} />
  </Route>
)
