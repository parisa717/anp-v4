import { Route } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'

import { BrandsListPage, CreateBrandPage, EditBrandPage } from './lazyComponents'

export const brandsRoutes = (
  <>
    <Route path={ROUTE_PATHS.Brands.Root} element={<BrandsListPage />}>
      <Route path={ROUTE_PATHS.Brands.Create.slice(ROUTE_PATHS.Brands.Root.length + 1)} element={<CreateBrandPage />} />
      <Route path={ROUTE_PATHS.Brands.Edit.slice(ROUTE_PATHS.Brands.Root.length + 1)} element={<EditBrandPage />} />
    </Route>
  </>
)
