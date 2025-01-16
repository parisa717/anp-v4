import { lazy } from 'react'

export const AreasListPage = lazy(() => import('./areasList/ui/Page'))
export const CreateAreaPage = lazy(() => import('./createArea/ui/Page'))
export const EditAreaPage = lazy(() => import('./editArea/ui/Page'))
export const AreaDetailPage = lazy(() => import('./areaDetail/ui/Page'))

