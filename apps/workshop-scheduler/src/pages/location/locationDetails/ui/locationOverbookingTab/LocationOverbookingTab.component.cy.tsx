import { GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { LocationOverbookingTab } from './LocationOverbookingTab'

describe('LocationOverbooking component', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationOverbooking')) {
        aliasQuery(req, 'GetLocationOverbooking')
        successResponse(req, GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationOverbookingTab />)
    cy.wait('@gqlGetLocationOverbookingQuery')
  })

  it('should render correctly', () => {
    cy.get('[data-cy="location-overbooking-title"]').should('contain.text', 'Overbooking Setup')
    cy.get('[data-cy="location-overbooking-description"]').should('contain.text', 'Overbooking lowest level')
  })

  it('should not render content when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationOverbooking')) {
        aliasQuery(req, 'GetLocationOverbooking')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<LocationOverbookingTab />)
    cy.wait('@gqlGetLocationOverbookingQuery')

    cy.get('[data-cy="location-overbooking-content"]').should('not.exist')
    cy.contains('Error occured!').should('be.visible')
  })
})
