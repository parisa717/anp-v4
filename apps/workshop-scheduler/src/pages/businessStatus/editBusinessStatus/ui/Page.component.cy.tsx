import {
  EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  EDIT_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  EDIT_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  GET_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  GET_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import EditBusinessStatusPage from './Page'

describe('EditBusinessStatusPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBusinessStatus')) {
        aliasQuery(req, 'GetBusinessStatus')

        successResponse(req, GET_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
      }

      if (hasOperationName(req, 'GetAdditionalBusinessStatus')) {
        aliasQuery(req, 'GetAdditionalBusinessStatus')

        successResponse(req, GET_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
      }
    })
  })

  describe('isAdditionalBusinessStatus is false', () => {
    it('renders the page', () => {
      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Edit appointment status').should('be.visible')
      cy.contains('label', 'Define as default').should('be.visible')
      cy.get('#name').should('be.visible').should('have.value', 'Open')
      cy.get('input[name="isDefault"]').should('not.be.checked').parent().should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus={false} />, {
        initialRouteEntries: ['/business-status/edit/1'],
        route: '/business-status/edit/:id',
      })

      cy.get('#name').clear().type('Test business status')
      cy.get('input[name="isDefault"]').parent().click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'EditBusinessStatus')) {
          aliasMutation(req, 'EditBusinessStatus')

          expect(req.body.variables.businessStatus).to.deep.equal({
            id: '1',
            name: 'Test business status',
            isDefault: true,
          })

          successResponse(req, EDIT_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlEditBusinessStatusMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.get('#name').clear()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 1)
    })

    it('the isDefault radio button is disabled when isInitiallyDefault is true', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetBusinessStatus')) {
          aliasQuery(req, 'GetBusinessStatus')

          successResponse(req, {
            getWorkshopAppointmentBusinessStatus: {
              ...GET_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE.getWorkshopAppointmentBusinessStatus,
              isDefault: true,
            },
          })
        }
      })

      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.get('input[name="isDefault"]').should('be.disabled')
    })

    it('displays feature-specific server-side error', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'EditBusinessStatus')) {
          aliasMutation(req, 'EditBusinessStatus')

          expect(req.body.variables.businessStatus).to.deep.equal({
            id: '1',
            name: 'Status 1',
            isDefault: false,
          })

          errorResponse(req, EDIT_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus={false} />, {
        initialRouteEntries: ['/business-status/1/edit'],
        route: '/business-status/:id/edit',
      })

      cy.get('#name').clear().type('Status 1')

      cy.get('button[aria-label="save"]').click()
      cy.wait('@gqlEditBusinessStatusMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Business status already exists')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    it('renders the page', () => {
      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Edit appointment status').should('be.visible')
      cy.contains('label', 'Define as default').should('be.visible')
      cy.get('#name').should('be.visible').should('have.value', 'Open')
      cy.get('input[name="isDefault"]').should('not.be.checked').parent().should('be.visible')
      cy.contains('label', 'Highlighted in slots').should('be.visible')
      cy.get('input[name="isHighlighted"]').should('not.be.checked').parent().should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus />, {
        initialRouteEntries: ['/business-status/edit/1'],
        route: '/business-status/edit/:id',
      })

      cy.get('#name').clear().type('Test business status')
      cy.get('input[name="isDefault"]').parent().click()
      cy.get('input[name="isHighlighted"]').parent().click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'EditAdditionalBusinessStatus')) {
          aliasMutation(req, 'EditAdditionalBusinessStatus')

          expect(req.body.variables.additionalBusinessStatus).to.deep.equal({
            id: '1',
            name: 'Test business status',
            isDefault: true,
            isHighlighted: true,
          })

          successResponse(req, EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlEditAdditionalBusinessStatusMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus />)

      cy.get('#name').clear()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 1)
    })

    it('the isDefault radio button is disabled when isInitiallyDefault is true', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAdditionalBusinessStatus')) {
          aliasQuery(req, 'GetAdditionalBusinessStatus')

          successResponse(req, {
            getWorkshopAppointmentAdditionalBusinessStatus: {
              ...GET_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE.getWorkshopAppointmentAdditionalBusinessStatus,
              isDefault: true,
            },
          })
        }
      })

      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus />)

      cy.get('input[name="isDefault"]').should('be.disabled')
    })

    it('displays feature-specific server-side error', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'EditAdditionalBusinessStatus')) {
          aliasMutation(req, 'EditAdditionalBusinessStatus')

          expect(req.body.variables.additionalBusinessStatus).to.deep.equal({
            id: '1',
            name: 'Status 1',
            isDefault: false,
            isHighlighted: false,
          })

          errorResponse(req, EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<EditBusinessStatusPage isAdditionalBusinessStatus />, {
        initialRouteEntries: ['/business-status/1/edit-additional'],
        route: '/business-status/:id/edit-additional',
      })

      cy.wait('@gqlGetAdditionalBusinessStatusQuery')

      cy.get('#name').clear().type('Status 1')

      cy.get('button[aria-label="save"]').click()
      cy.wait('@gqlEditAdditionalBusinessStatusMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Additional business status already exists')
    })
  })
})
