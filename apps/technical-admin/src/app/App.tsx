import './translations'

import { BrowserRouter, Route, Routes } from 'react-router'

import { areasRoutes } from '@/pages/areas'
import { brandsRoutes } from '@/pages/brands'
import { locationsRoutes } from '@/pages/locations'
import { BaseLayout } from '@/widgets/baseLayout'

import { Providers } from './providers'

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<div>Home</div>} />
            {areasRoutes}
            {brandsRoutes}
            {locationsRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
