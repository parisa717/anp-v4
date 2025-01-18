import {
  DELETE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE,
  DELETE_LOCATION_WORK_SERVER_SIDE_ERROR_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import RemoveLocationWorkPage from './Page'

const LOCATION_ID = '1'
const LOCATION_WORK_ID = '1'
describe('RemoveLocationWorkPage', () => {
  it('submits the form with valid data', () => {
    cy.mountWithProviders(<RemoveLocationWorkPage />, {
      initialRouteEntries: [`/location/${LOCATION_ID}/details/services/remove/${LOCATION_WORK_ID}`],
      route: '/location/:id/details/services/remove/:locationWorkId',
    })
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'DeleteLocationWork')) {
        aliasMutation(req, 'DeleteLocationWork')
        expect(req.body.variables).to.deep.equal({ id: LOCATION_WORK_ID })
        successResponse(req, {
          deleteWorkshopLocationWork: DELETE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })
    cy.get('button[aria-label="save"]').click()
    cy.wait('@gqlDeleteLocationWorkMutation')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'DeleteLocationWork')) {
        aliasMutation(req, 'DeleteLocationWork')
        errorResponse(req, DELETE_LOCATION_WORK_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<RemoveLocationWorkPage />, {
      initialRouteEntries: [`/location/${LOCATION_ID}/details/services/remove/${LOCATION_WORK_ID}`],
      route: '/location/:id/details/services/remove/:locationWorkId',
    })

    cy.get('button[aria-label="save"]').click()
    cy.wait('@gqlDeleteLocationWorkMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location does not exist.')
  })
})
