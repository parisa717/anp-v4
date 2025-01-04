import {
  GET_LOCATION_SERVICE_ADVISORS_DEFAULT_RESPONSE,
  GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { getStore } from '@/app/store'
import { setCurrentLocation } from '@/entities/location'

import LocationServiceAdvisorListPage from './Page'

describe('LocationServiceAdvisorListPage', () => {
  beforeEach(() => {
    const store = getStore()

    store.dispatch(setCurrentLocation(GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations[0]))

    cy.mountWithProviders(<LocationServiceAdvisorListPage />, {
      reduxStore: store,
    })
  })

  it('displays data correctly when success request', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationServiceAdvisors')) {
        aliasQuery(req, 'GetLocationServiceAdvisors')
        successResponse(req, GET_LOCATION_SERVICE_ADVISORS_DEFAULT_RESPONSE)
      }
    })
    cy.wait('@gqlGetLocationServiceAdvisorsQuery')

    GET_LOCATION_SERVICE_ADVISORS_DEFAULT_RESPONSE.getLocationServiceAdvisors.serviceAdvisors.forEach((data) => {
      cy.contains(`${data.name} ${data.surname}`).should('exist')
      cy.contains(data.number).should('exist')
      cy.contains(data.receptionInterval).should('exist')
    })
  })

  it('shows error message when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationServiceAdvisors')) {
        aliasQuery(req, 'GetLocationServiceAdvisors')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
      cy.wait('@gqlGetLocationServiceAdvisorsQuery')

      cy.contains('Error').should('be.visible')
    })
  })
})
