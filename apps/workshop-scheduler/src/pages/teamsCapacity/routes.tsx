import { Route } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'

import { TeamsCapacityPage } from './lazyComponents'

export const teamsCapacityRoutes = <Route path={ROUTE_PATHS.TeamsCapacity.Root} element={<TeamsCapacityPage />} />
