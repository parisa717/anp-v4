import {
  DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  DEACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  DEACTIVATE_BUSINESS_STATUS_WITH_DEFAULT_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import UnselectDefaultBusinessStatusPage from './Page'

const BUSINESS_STATUS_ID = '1'

describe('UnselectDefaultBusinessStatusPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBusinessStatuses')) {
        aliasQuery(req, 'GetBusinessStatuses')
        successResponse(req, GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
      }

      if (hasOperationName(req, 'GetAdditionalBusinessStatuses')) {
        aliasQuery(req, 'GetAdditionalBusinessStatuses')
        successResponse(req, GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
      }
    })
  })

  describe('isAdditionalBusinessStatus is false', () => {
    const activeBusinessStatuses =
      GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE.getWorkshopAppointmentBusinessStatuses.businessStatuses.filter(
        (businessStatus) => businessStatus.isActive,
      )

    it('renders the page', () => {
      cy.mountWithProviders(<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus={false} />, {
        initialRouteEntries: [`/business-status/${BUSINESS_STATUS_ID}/unselect-default`],
        route: '/business-status/:id/unselect-default',
      })

      cy.contains('Unselect default status').should('be.visible')

      cy.contains('as default appointment status').should('be.visible')

      activeBusinessStatuses?.forEach((businessStatus) => {
        cy.contains(businessStatus.name).should('be.visible')
      })

      cy.get('label:contains(Define as default)').should('have.length', activeBusinessStatuses.length - 1)
      cy.get('input[name="defaultBusinessStatusId"]')
        .should('have.length', activeBusinessStatuses.length - 1)
        .each(($radioButton) => {
          cy.wrap($radioButton).should('not.be.checked').parent().should('be.visible')
        })

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus={false} />, {
        initialRouteEntries: [`/business-status/${BUSINESS_STATUS_ID}/unselect-default`],
        route: '/business-status/:id/unselect-default',
      })

      cy.get('input[name="defaultBusinessStatusId"]').eq(0).parent().click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateBusinessStatus')) {
          aliasMutation(req, 'DeactivateBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
            defaultBusinessStatusId: '2',
          })

          successResponse(req, DEACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlDeactivateBusinessStatusMutation')
    })

    it('displays feature-specific server-side error', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateBusinessStatus')) {
          aliasMutation(req, 'DeactivateBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
            defaultBusinessStatusId: '2',
          })

          errorResponse(req, DEACTIVATE_BUSINESS_STATUS_WITH_DEFAULT_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus={false} />, {
        initialRouteEntries: [`/business-status/${BUSINESS_STATUS_ID}/unselect-default`],
        route: '/business-status/:id/unselect-default',
      })

      cy.get('input[name="defaultBusinessStatusId"]').eq(0).parent().click()
      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlDeactivateBusinessStatusMutation')
      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'An inactive status cannot be set as default.')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    const activeAdditionalBusinessStatuses =
      GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE.getWorkshopAppointmentAdditionalBusinessStatuses.additionalBusinessStatuses.filter(
        (additionalBusinessStatus) => additionalBusinessStatus.isActive,
      )

    it('renders the page', () => {
      cy.mountWithProviders(<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus />, {
        initialRouteEntries: [`/business-status/${BUSINESS_STATUS_ID}/unselect-default-additional`],
        route: '/business-status/:id/unselect-default-additional',
      })

      cy.contains('Unselect default status').should('be.visible')

      cy.contains('as additional status').should('be.visible')

      activeAdditionalBusinessStatuses?.forEach((businessStatus) => {
        cy.contains(businessStatus.name).should('be.visible')
      })

      cy.get('label:contains(Define as default)').should('have.length', activeAdditionalBusinessStatuses.length - 1)
      cy.get('input[name="defaultBusinessStatusId"]')
        .should('have.length', activeAdditionalBusinessStatuses.length - 1)
        .each(($radioButton) => {
          cy.wrap($radioButton).should('not.be.checked').parent().should('be.visible')
        })

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<UnselectDefaultBusinessStatusPage isAdditionalBusinessStatus />, {
        initialRouteEntries: [`/business-status/${BUSINESS_STATUS_ID}/unselect-default-additional`],
        route: '/business-status/:id/unselect-default-additional',
      })

      cy.get('input[name="defaultBusinessStatusId"]').eq(0).parent().click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'DeactivateAdditionalBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
            defaultAdditionalBusinessStatusId: '2',
          })

          successResponse(req, DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlDeactivateAdditionalBusinessStatusMutation')
    })
  })
})
