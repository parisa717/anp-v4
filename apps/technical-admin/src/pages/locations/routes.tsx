import { Route } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'

import { CreateLocationPage } from './lazyComponents'
import EditLocationList from './editLocation/ui/Page'

export const locationsRoutes = (
  <>
    <Route path={ROUTE_PATHS.Locations.Root} element={null}>
      <Route
        path={ROUTE_PATHS.Locations.Create.slice(ROUTE_PATHS.Locations.Root.length + 1)}
        element={<CreateLocationPage />}
      />
      <Route
        path={ROUTE_PATHS.Locations.Edit.slice(ROUTE_PATHS.Locations.Root.length + 1)}
        element={<EditLocationList />}
      />
    </Route>
  </>
)
