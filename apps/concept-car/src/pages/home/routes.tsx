import { Route } from 'react-router'

import { ROUTE_PATHS } from '@/router/routePaths'

import Home from './Home'

export const homeRoutes = <Route path={ROUTE_PATHS.Root} element={<Home />} />
