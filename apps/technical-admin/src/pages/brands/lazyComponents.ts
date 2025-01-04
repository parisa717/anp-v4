import { lazy } from 'react'

export const BrandsListPage = lazy(() => import('./brandsList/ui/Page'))
export const CreateBrandPage = lazy(() => import('./createBrand/ui/Page'))
export const EditBrandPage = lazy(() => import('./editBrand/ui/Page'))
