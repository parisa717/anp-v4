import { lazy } from 'react'

export const LocationsListPage = lazy(() => import('./locationsList/ui/Page'))
export const LocationDetailsPage = lazy(() => import('./locationDetails/ui/Page'))
export const CreateLocationWorkPage = lazy(
  () => import('./locationDetails/ui/locationWorksTab/createLocationWork/ui/Page'),
)
export const EditLocationWorkPage = lazy(() => import('./locationDetails/ui/locationWorksTab/editLocationWork/ui/Page'))
export const RemoveLocationWorkPage = lazy(
  () => import('./locationDetails/ui/locationWorksTab/removeLocationWork/ui/Page'),
)
