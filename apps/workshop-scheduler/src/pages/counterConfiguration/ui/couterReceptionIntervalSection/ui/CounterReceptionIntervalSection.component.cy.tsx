import { GET_COUNTER_RECEPTION_INTERVAL } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { CounterReceptionIntervalSection } from './CounterReceptionIntervalSection'

describe('CounterReceptionIntervalSection component', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounter')) {
        aliasQuery(req, 'GetLocationCounter')
        successResponse(req, GET_COUNTER_RECEPTION_INTERVAL)
      }
    })

    cy.mountWithProviders(<CounterReceptionIntervalSection />)
    cy.wait('@gqlGetLocationCounterQuery')
  })

  it('should not render content when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounter')) {
        aliasQuery(req, 'GetLocationCounter')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<CounterReceptionIntervalSection />)
    cy.wait('@gqlGetLocationCounterQuery')

    cy.contains('Define slots frequency').should('not.exist')
    cy.contains('Error occured!').should('be.visible')
  })
})
