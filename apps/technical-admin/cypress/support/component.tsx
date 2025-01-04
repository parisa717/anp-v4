// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '../../src/index.css'
import 'cypress-real-events'

import { initInternationalization } from '@nexus-ui/i18n'
// Alternatively you can use CommonJS syntax:
// require('./commands')
import { mount, MountOptions } from 'cypress/react18'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router'

import { getStore } from '@/app/store'
import de from '@/app/translations/de.json'
import en from '@/app/translations/en.json'

beforeEach(() => {
  initInternationalization(
    {
      de,
      en,
    },
    {
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    },
  )
})

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      mountWithProviders(
        component: ReactNode,
        options?: MountOptions & {
          reduxStore?: ReturnType<typeof getStore>
          initialRouteEntries?: string[]
          route?: string
        },
      ): typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mountWithProviders', (component, options = {}) => {
  const { reduxStore = getStore(), initialRouteEntries = ['/'], route = '/', ...mountOptions } = options

  const wrapped = (
    <Provider store={reduxStore}>
      <MemoryRouter initialEntries={initialRouteEntries}>
        <Routes>
          <Route path={route} element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  mount(wrapped, mountOptions)
})

// Example use:
// cy.mount(<MyComponent />)
