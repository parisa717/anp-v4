import { lazy } from 'react'

export const BusinessStatusesListPage = lazy(() => import('./businessStatusesList/ui/Page'))
export const CreateBusinessStatusPage = lazy(() => import('./createBusinessStatus/ui/Page'))
export const EditBusinessStatusPage = lazy(() => import('./editBusinessStatus/ui/Page'))
export const UnselectDefaultBusinessStatusPage = lazy(() => import('./unselectDefaultBusinessStatus/ui/Page'))
export const ChangeBusinessStatusConfirmationPage = lazy(() => import('./changeBusinessStatusConfirmation/ui/Page'))
