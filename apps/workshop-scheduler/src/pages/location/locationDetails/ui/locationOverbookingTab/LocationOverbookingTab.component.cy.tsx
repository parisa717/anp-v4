import {
  GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE,
  GET_LOCATION_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE,
  UPDATE_LOCATION_MINIMAL_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

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

  it('displays feature-specific server-side error on fetch', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationOverbooking')) {
        aliasQuery(req, 'GetLocationOverbooking')
        errorResponse(req, GET_LOCATION_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationOverbookingTab />, {
      initialRouteEntries: ['/location/1/details'],
      route: '/location/:id/details',
    })

    cy.wait('@gqlGetLocationOverbookingQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Overbooking for the location not found.')
  })

  it('displays feature-specific server-side error on update', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationMinimalOverbooking')) {
        aliasMutation(req, 'UpdateLocationMinimalOverbooking')
        errorResponse(req, UPDATE_LOCATION_MINIMAL_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationOverbookingTab />, {
      initialRouteEntries: ['/location/1/details'],
      route: '/location/:id/details',
    })

    cy.get('[data-pc-name="button"]').click()
    cy.get('form').submit()

    cy.wait('@gqlUpdateLocationMinimalOverbookingMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location not found.')
  })
})
