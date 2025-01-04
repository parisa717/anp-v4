import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import { BusinessStatusesByLocationListPage, CreateBusinessStatusByLocationPage } from './lazyComponents'

export const businessStatusByLocationRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.BusinessStatusByLocation.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.BusinessStatusByLocation.Root} element={<BusinessStatusesByLocationListPage />}>
      <Route
        element={
          <PermissionLayout
            permissionsSet={[
              { entity: 'businessStatuses', access: [PermissionType.Write] },
              { entity: 'locationStatus', access: [PermissionType.Write] },
            ]}
            pathToRelevantRoute={ROUTE_PATHS.BusinessStatusByLocation.Root}
          />
        }
      >
        <Route
          path={ROUTE_PATHS.BusinessStatusByLocation.Create.slice(ROUTE_PATHS.BusinessStatusByLocation.Root.length + 1)}
          element={<CreateBusinessStatusByLocationPage isAdditionalBusinessStatus={false} />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatusByLocation.CreateAdditional.slice(
            ROUTE_PATHS.BusinessStatusByLocation.Root.length + 1,
          )}
          element={<CreateBusinessStatusByLocationPage isAdditionalBusinessStatus />}
        />
      </Route>
    </Route>
  </Route>
)
