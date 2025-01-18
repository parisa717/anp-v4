import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import {
  CreateLocationWorkPage,
  EditLocationWorkPage,
  LocationDetailsPage,
  LocationsListPage,
  RemoveLocationWorkPage,
} from './lazyComponents'

export const locationRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.Location.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.Location.Root} element={<LocationsListPage />} />
    <Route
      element={
        <PermissionLayout
          permissionsSet={[
            { entity: 'work', access: [PermissionType.Read] },
            { entity: 'area', access: [PermissionType.Read] },
            { entity: 'overbooking', access: [PermissionType.Read] },
            { entity: 'location', access: [PermissionType.Write] },
            { entity: 'locationWorkshop', access: [PermissionType.Read, PermissionType.Write] },
            { entity: 'minimalOverbooking', access: [PermissionType.Write] },
          ]}
          pathToRelevantRoute={ROUTE_PATHS.Location.Root}
        />
      }
    >
      <Route path={ROUTE_PATHS.Location.Details.Root} element={<LocationDetailsPage />}>
        <Route
          path={ROUTE_PATHS.Location.Details.LocationWorks.Create.slice(ROUTE_PATHS.Location.Details.Root.length + 1)}
          element={<CreateLocationWorkPage />}
        />
        <Route
          path={ROUTE_PATHS.Location.Details.LocationWorks.Edit.slice(ROUTE_PATHS.Location.Details.Root.length + 1)}
          element={<EditLocationWorkPage />}
        />
        <Route
          path={ROUTE_PATHS.Location.Details.LocationWorks.Remove.slice(ROUTE_PATHS.Location.Details.Root.length + 1)}
          element={<RemoveLocationWorkPage />}
        />
      </Route>
    </Route>
  </Route>
)
