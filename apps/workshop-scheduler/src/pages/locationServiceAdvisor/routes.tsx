import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import { LocationServiceAdvisorDetailsPage, LocationServiceAdvisorListPage } from './lazyComponents'

export const locationServiceAdvisorRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.LocationServiceAdvisor.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.LocationServiceAdvisor.Root} element={<LocationServiceAdvisorListPage />} />
    <Route
      element={
        <PermissionLayout
          permissionsSet={[
            { entity: 'absence', access: [PermissionType.Read] },
            { entity: 'location', access: [PermissionType.Read] },
          ]}
          pathToRelevantRoute={ROUTE_PATHS.LocationServiceAdvisor.Root}
        />
      }
    >
      <Route path={ROUTE_PATHS.LocationServiceAdvisor.Details} element={<LocationServiceAdvisorDetailsPage />} />
    </Route>
  </Route>
)
