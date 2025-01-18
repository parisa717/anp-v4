import './translations'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { ProgressSpinner } from 'primereact/progressspinner'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import { businessStatusRoutes } from '@/pages/businessStatus'
import { businessStatusByLocationRoutes } from '@/pages/businessStatusByLocation'
import { colorSetupRoutes } from '@/pages/colorSetup'
import { counterConfigurationRoutes } from '@/pages/counterConfiguration'
import { locationRoutes } from '@/pages/location'
import { locationServiceAdvisorRoutes } from '@/pages/locationServiceAdvisor'
import { teamsCapacityRoutes } from '@/pages/teamsCapacity'
import { workRoutes } from '@/pages/work'

import { AppLayout } from './AppLayout'
import { Providers } from './providers'
import { RouterPageUrlSync } from './router/RouterPageUrlSync'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <RouterPageUrlSync />
        <Suspense fallback={<ProgressSpinner />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<div>Home</div>} />
              {businessStatusByLocationRoutes}
              {businessStatusRoutes}
              {colorSetupRoutes}
              {counterConfigurationRoutes}
              {locationServiceAdvisorRoutes}
              {locationRoutes}
              {workRoutes}
              {teamsCapacityRoutes}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Providers>
  )
}

export default App
