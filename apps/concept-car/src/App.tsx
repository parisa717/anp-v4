import './App.css'

import { BrowserRouter, Routes } from 'react-router'

import { homeRoutes } from '@/pages/home'

import { Providers } from './components/providers'

export const App = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>{homeRoutes}</Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
