import { Route } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'

import { CreateLocationPage, LocationsListPage } from './lazyComponents'

export const locationsRoutes = (
  <>
    <Route path={ROUTE_PATHS.Locations.Root} element={<LocationsListPage />}>
      <Route
        path={ROUTE_PATHS.Locations.Create.slice(ROUTE_PATHS.Locations.Root.length + 1)}
        element={<CreateLocationPage />}
      />
    </Route>
  </>
)
