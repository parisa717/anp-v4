import { PrimeReactProvider } from 'primereact/api'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '../store'
import { PermissionGate } from './PermissionGate'

interface AppProvidersProps {
  readonly children: ReactNode
}

export const Providers = ({ children }: AppProvidersProps) => {
  return (
    <PrimeReactProvider
      value={{
        pt: {
          column: {
            sortIcon: {
              className: 'text-theme-primary',
            },
          },
        },
      }}
    >
      <ReduxProvider store={store}>
        <PermissionGate>{children}</PermissionGate>
      </ReduxProvider>
    </PrimeReactProvider>
  )
}
