import {
  ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE,
  ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE,
  ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import { getStore } from '@/app/store'
import { setCurrentLocation } from '@/entities/location'

import CreateBusinessStatusByLocationPage from './Page'

describe('CreateBusinessStatusByLocationPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBusinessStatuses')) {
        aliasQuery(req, 'GetBusinessStatuses')
        successResponse(req, GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
      }

      if (hasOperationName(req, 'GetBusinessStatusesByLocation')) {
        aliasQuery(req, 'GetBusinessStatusesByLocation')
        successResponse(req, GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE)
      }
    })

    const store = getStore()

    store.dispatch(setCurrentLocation(GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations[0]))

    cy.mountWithProviders(<CreateBusinessStatusByLocationPage isAdditionalBusinessStatus={false} />, {
      reduxStore: store,
      initialRouteEntries: ['/business-status-by-location/create'],
      route: '/business-status-by-location/create',
    })

    cy.wait('@gqlGetBusinessStatusesQuery')
    cy.wait('@gqlGetBusinessStatusesByLocationQuery')
  })

  it('disables option in the dropdown if it is already selected', () => {
    cy.get('[data-pc-name="dropdown"]').eq(0).click()
    cy.get('[data-pc-section="item"]:contains("Arrived")').click()

    cy.get('[data-pc-name="dropdown"]').eq(0).click()
    cy.get('[data-pc-section="item"]:contains("Arrived")').should('have.class', 'p-disabled')
  })

  it('disables the "add another status" and "add all statuses" buttons if all statuses are already selected', () => {
    cy.contains('add all statuses').click()

    cy.get('button[aria-label="add another status"]').should('be.disabled')
    cy.get('button[aria-label="add all statuses"]').should('be.disabled')
  })

  describe('isAdditionalBusinessStatus is false', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetBusinessStatuses')) {
          aliasQuery(req, 'GetBusinessStatuses')
          successResponse(req, GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }

        if (hasOperationName(req, 'GetBusinessStatusesByLocation')) {
          aliasQuery(req, 'GetBusinessStatusesByLocation')
          successResponse(req, GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      const store = getStore()

      store.dispatch(setCurrentLocation(GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations[0]))

      cy.mountWithProviders(<CreateBusinessStatusByLocationPage isAdditionalBusinessStatus={false} />, {
        reduxStore: store,
        initialRouteEntries: ['/business-status-by-location/create'],
        route: '/business-status-by-location/create',
      })

      cy.wait('@gqlGetBusinessStatusesQuery')
      cy.wait('@gqlGetBusinessStatusesByLocationQuery')
    })

    it('renders the page', () => {
      cy.contains('Add appointment status').should('be.visible')
      cy.get('#businessStatuses\\.0\\.id').should('be.visible')

      cy.contains('add another status').should('be.visible')
      cy.contains('add all statuses').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      // selects value in a dropdown
      cy.get('[data-pc-name="dropdown"]').eq(0).click()
      cy.get('[data-pc-section="item"]:contains("Arrived")').click()

      cy.contains('add another status').click()

      // selects value in a dropdown
      cy.get('[data-pc-name="dropdown"]').eq(1).click()
      cy.get('[data-pc-section="item"]:contains("Finished")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignBusinessStatusesToLocation')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              id: '2',
            },
            {
              id: '4',
            },
          ])

          successResponse(req, ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlAssignBusinessStatusesToLocationMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.contains('add another status').click()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 2)
    })

    it('removes entry when remove button is clicked', () => {
      cy.contains('add another status').click()
      cy.get('.pi-trash').first().click()

      cy.get('[data-pc-name="dropdown"]').eq(1).should('not.exist')

      // selects value in a dropdown
      cy.get('[data-pc-name="dropdown"]').eq(0).click()
      cy.get('[data-pc-section="item"]:contains("Arrived")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignBusinessStatusesToLocation')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              id: '2',
            },
          ])

          successResponse(req, ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlAssignBusinessStatusesToLocationMutation')
    })

    it('fills in and submits the form when clicking "Add all statuses" button', () => {
      cy.contains('add all statuses').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignBusinessStatusesToLocation')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              id: '2',
            },
            {
              id: '4',
            },
          ])

          successResponse(req, ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlAssignBusinessStatusesToLocationMutation')
    })

    it('displays feature-specific server-side error', () => {
      cy.get('[data-pc-name="dropdown"]').eq(0).click()
      cy.get('[data-pc-section="item"]:contains("Arrived")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignBusinessStatusesToLocation')

          errorResponse(req, ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()
      cy.wait('@gqlAssignBusinessStatusesToLocationMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'At least one business status must be active.')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAdditionalBusinessStatuses')) {
          aliasQuery(req, 'GetAdditionalBusinessStatuses')
          successResponse(req, GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }

        if (hasOperationName(req, 'GetAdditionalBusinessStatusesByLocation')) {
          aliasQuery(req, 'GetAdditionalBusinessStatusesByLocation')
          successResponse(req, GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      const store = getStore()

      store.dispatch(setCurrentLocation(GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations[0]))

      cy.mountWithProviders(<CreateBusinessStatusByLocationPage isAdditionalBusinessStatus />, {
        reduxStore: store,
        initialRouteEntries: ['/business-status-by-location/create-additional'],
        route: '/business-status-by-location/create-additional',
      })

      cy.wait('@gqlGetAdditionalBusinessStatusesQuery')
      cy.wait('@gqlGetAdditionalBusinessStatusesByLocationQuery')
    })

    it('renders the page', () => {
      cy.contains('Add additional status').should('be.visible')
      cy.get('#businessStatuses\\.0\\.id').should('be.visible')

      cy.contains('add another additional status').should('be.visible')
      cy.contains('add all additional statuses').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      // selects value in a dropdown
      cy.get('[data-pc-name="dropdown"]').eq(0).click()
      cy.get('[data-pc-section="item"]:contains("Mobile service")').click()

      cy.contains('add another additional status').click()

      // selects value in a dropdown
      cy.get('[data-pc-name="dropdown"]').eq(1).click()
      cy.get('[data-pc-section="item"]:contains("Special appointment")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignAdditionalBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignAdditionalBusinessStatusesToLocation')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              id: '4',
            },
            {
              id: '6',
            },
          ])

          successResponse(req, ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlAssignAdditionalBusinessStatusesToLocationMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.contains('add another additional status').click()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 2)
    })

    it('removes entry when remove button is clicked', () => {
      cy.contains('add another additional status').click()
      cy.get('.pi-trash').first().click()

      cy.get('[data-pc-name="dropdown"]').eq(1).should('not.exist')

      // selects value in a dropdown
      cy.get('[data-pc-name="dropdown"]').eq(0).click()
      cy.get('[data-pc-section="item"]:contains("Mobile service")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignAdditionalBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignAdditionalBusinessStatusesToLocation')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              id: '4',
            },
          ])

          successResponse(req, ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlAssignAdditionalBusinessStatusesToLocationMutation')
    })

    it('fills in and submits the form when clicking "Add all additional statuses" button', () => {
      cy.contains('add all additional statuses').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignAdditionalBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignAdditionalBusinessStatusesToLocation')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              id: '4',
            },
            {
              id: '5',
            },
            {
              id: '6',
            },
          ])

          successResponse(req, ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlAssignAdditionalBusinessStatusesToLocationMutation')
    })

    it('displays feature-specific server-side error', () => {
      cy.get('[data-pc-name="dropdown"]').eq(0).click()
      cy.get('[data-pc-section="item"]:contains("Mobile service")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'AssignAdditionalBusinessStatusesToLocation')) {
          aliasMutation(req, 'AssignAdditionalBusinessStatusesToLocation')

          errorResponse(req, ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()
      cy.wait('@gqlAssignAdditionalBusinessStatusesToLocationMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should(
        'include.text',
        'At least one additional business status must be active.',
      )
    })
  })
})
