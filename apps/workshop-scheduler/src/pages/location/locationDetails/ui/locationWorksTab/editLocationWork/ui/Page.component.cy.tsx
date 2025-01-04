import {
  GET_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_LOCATION_WORK_DEFAULT_RESPONSE,
  GET_WORKSHOP_WORK_DEFAULT_RESPONSE,
  UPDATE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import EditLocationWorkPage from './Page'

const LOCATION_ID = '1'
const LOCATION_WORK_ID = '1'
describe('EditLocationWorkPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocation')) {
        aliasQuery(req, 'GetLocation')
        successResponse(req, GET_LOCATION_OPERATION_DEFAULT_RESPONSE)
      }
      if (hasOperationName(req, 'GetLocationWork')) {
        aliasQuery(req, 'GetLocationWork')
        successResponse(req, { getWorkshopLocationWork: GET_LOCATION_WORK_DEFAULT_RESPONSE })
      }
      if (hasOperationName(req, 'GetWorkshopWork')) {
        aliasQuery(req, 'GetWorkshopWork')
        successResponse(req, { getWorkshopWork: GET_WORKSHOP_WORK_DEFAULT_RESPONSE })
      }
    })
    cy.mountWithProviders(<EditLocationWorkPage />, {
      initialRouteEntries: [`/location/${LOCATION_ID}/details/services/edit/${LOCATION_WORK_ID}`],
      route: '/location/:id/details/services/edit/:locationWorkId',
    })
    cy.wait('@gqlGetLocationQuery')
    cy.wait('@gqlGetLocationWorkQuery')
    cy.wait('@gqlGetWorkshopWorkQuery')
  })

  it('shows an error for select brand when no brand selected', () => {
    cy.contains('label', 'OPEL').click()
    cy.contains('label', 'TOYOTA').click()
    cy.get('.text-error').should('exist')
  })

  it('disables day limit in amount input when day limit in percent is filled', () => {
    cy.get('[data-pc-name="inputtext"]').eq(1).clear()
    cy.get('[data-pc-name="inputtext"]').first().type('50')
    cy.get('[data-pc-name="inputtext"]').eq(1).should('be.disabled')
  })

  it('disables day limit in percent input when day limit in amount is filled', () => {
    cy.get('[data-pc-name="inputtext"]').first().should('be.disabled')
  })

  it('submits the form with valid data', () => {
    const capacityPerDayLimit = 50
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationWork')) {
        aliasMutation(req, 'UpdateLocationWork')

        expect(req.body.variables.locationWork).to.deep.equal({
          brands: [{ id: 'brand_2' }],
          id: LOCATION_WORK_ID,
          workId: GET_LOCATION_WORK_DEFAULT_RESPONSE.workId,
          locationId: LOCATION_ID,
          isRecommended: GET_LOCATION_WORK_DEFAULT_RESPONSE.isRecommended,
          amountPerDayLimit: null,
          capacityPerDayLimit: capacityPerDayLimit / 100,
        })

        successResponse(req, {
          updateWorkshopLocationWork: UPDATE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })
    cy.contains('label', 'OPEL').click()
    cy.get('[data-pc-name="inputtext"]').eq(1).clear()
    cy.get('[data-pc-name="inputtext"]').first().type(capacityPerDayLimit.toString())
    cy.get('button[aria-label="save"]').click()
    cy.wait('@gqlUpdateLocationWorkMutation')
  })
})
