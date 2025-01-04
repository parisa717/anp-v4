import { GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import BusinessStatusesByLocationListPage from './Page'

describe('BusinessStatusByLocationListPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationOverbooking')) {
        aliasQuery(req, 'GetLocationOverbooking')
        successResponse(req, GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE)
      }
    })
    cy.mountWithProviders(<BusinessStatusesByLocationListPage />)
    cy.wait('@gqlGetLocationOverbookingQuery')
  })

  describe('LocationOverbooking', () => {
    it('should disable editing WarningLocationOverbooking when editing MaximumLocationOverbooking', () => {
      cy.get('[data-cy=capacity-overbooking-edit-button]').should('have.length', 2)
      cy.get('[data-cy=capacity-overbooking-edit-button]').eq(0).click()
      cy.get('[data-cy=capacity-overbooking-edit-button]').should('have.length', 1)
      cy.get('[data-cy=capacity-overbooking-edit-button]').eq(0).should('be.disabled')
    })
    it('should disable editing MaximumLocationOverbooking when editing WarningLocationOverbooking', () => {
      cy.get('[data-cy=capacity-overbooking-edit-button]').should('have.length', 2)
      cy.get('[data-cy=capacity-overbooking-edit-button]').eq(1).click()
      cy.get('[data-cy=capacity-overbooking-edit-button]').should('have.length', 1)
      cy.get('[data-cy=capacity-overbooking-edit-button]').eq(0).should('be.disabled')
    })
  })
})
