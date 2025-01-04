import { Route } from 'react-router'

import { CommonPermissionsConfig, PermissionLayout } from '@/entities/permission'
import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import {
  BusinessStatusesListPage,
  ChangeBusinessStatusConfirmationPage,
  CreateBusinessStatusPage,
  EditBusinessStatusPage,
  UnselectDefaultBusinessStatusPage,
} from './lazyComponents'

export const businessStatusRoutes = (
  <Route
    element={
      <PermissionLayout
        permissionsSet={CommonPermissionsConfig[ROUTE_PATHS.BusinessStatus.Root]}
        pathToRelevantRoute={ROUTE_PATHS.Root}
      />
    }
  >
    <Route path={ROUTE_PATHS.BusinessStatus.Root} element={<BusinessStatusesListPage />}>
      <Route
        element={
          <PermissionLayout
            permissionsSet={[{ entity: 'businessStatuses', access: [PermissionType.Write] }]}
            pathToRelevantRoute={ROUTE_PATHS.BusinessStatus.Root}
          />
        }
      >
        <Route
          path={ROUTE_PATHS.BusinessStatus.Create.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatus.CreateAdditional.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<CreateBusinessStatusPage isAdditionalBusinessStatus />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatus.Edit.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<EditBusinessStatusPage isAdditionalBusinessStatus={false} />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatus.EditAdditional.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<EditBusinessStatusPage isAdditionalBusinessStatus />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatus.UnselectDefault.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus={false} />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatus.UnselectDefaultAdditional.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus />}
        />
        <Route
          path={ROUTE_PATHS.BusinessStatus.ChangeStatusConfirmation.slice(ROUTE_PATHS.BusinessStatus.Root.length + 1)}
          element={<ChangeBusinessStatusConfirmationPage />}
        />
      </Route>
    </Route>
  </Route>
)
