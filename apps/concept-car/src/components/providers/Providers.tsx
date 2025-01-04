import { PrimeReactProvider } from 'primereact/api'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '../../state'

interface ProvidersProps {
  readonly children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <PrimeReactProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </PrimeReactProvider>
  )
}
