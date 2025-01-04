import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import {
  ActivateServiceConfirmationPage,
  AddWorkPage,
  DeactivateServiceConfirmationPage,
  EditWorkModal,
  WorksListPage,
} from './lazyComponents'

export const workRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.Work.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.Work.Root} element={<WorksListPage />}>
      <Route
        element={
          <PermissionLayout
            permissionsSet={[{ entity: 'work', access: [PermissionType.Write] }]}
            pathToRelevantRoute={ROUTE_PATHS.Work.Root}
          />
        }
      >
        <Route
          element={
            <PermissionLayout
              permissionsSet={[{ entity: 'location', access: [PermissionType.Read] }]}
              pathToRelevantRoute={ROUTE_PATHS.Work.Root}
            />
          }
        >
          <Route path={ROUTE_PATHS.Work.Add.slice(ROUTE_PATHS.Work.Root.length + 1)} element={<AddWorkPage />} />
          <Route path={ROUTE_PATHS.Work.Edit.slice(ROUTE_PATHS.Work.Root.length + 1)} element={<EditWorkModal />} />
        </Route>
        <Route
          path={ROUTE_PATHS.Work.DeactivateService.slice(ROUTE_PATHS.Work.Root.length + 1)}
          element={<DeactivateServiceConfirmationPage />}
        />
        <Route
          path={ROUTE_PATHS.Work.ActivateService.slice(ROUTE_PATHS.Work.Root.length + 1)}
          element={<ActivateServiceConfirmationPage />}
        />
      </Route>
    </Route>
  </Route>
)
