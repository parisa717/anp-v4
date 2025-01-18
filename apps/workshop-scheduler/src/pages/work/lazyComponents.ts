import { lazy } from 'react'

export const WorksListPage = lazy(() => import('./worksList/ui/Page'))
export const AddWorkPage = lazy(() => import('./addWork/ui/Page'))
export const EditWorkModal = lazy(() => import('./worksList/ui/worksListTab/editWorkModal/EditWorkModal'))
export const DeactivateServiceConfirmationPage = lazy(() => import('./deactivateServiceConfirmation/ui/Page'))
export const ActivateServiceConfirmationPage = lazy(() => import('./activateServiceConfirmation/ui/Page'))
export const CreateFollowUpWorkPage = lazy(() => import('./createFollowUpWork/ui/Page'))
export const EditFollowUpWorkModal = lazy(
  () => import('./worksList/ui/followUpWorksTab/editFollowUpWorkModal/EditFollowUpWorkModal'),
)
