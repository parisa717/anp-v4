import { Route } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'

import { AreasListPage, CreateAreaPage, EditAreaPage } from './lazyComponents'

export const areasRoutes = (
  <>
    <Route path={ROUTE_PATHS.Areas.Root} element={<AreasListPage />}>
      <Route path={ROUTE_PATHS.Areas.Create.slice(ROUTE_PATHS.Areas.Root.length + 1)} element={<CreateAreaPage />} />
      <Route path={ROUTE_PATHS.Areas.Edit.slice(ROUTE_PATHS.Areas.Root.length + 1)} element={<EditAreaPage />} />
    </Route>
  </>
)
