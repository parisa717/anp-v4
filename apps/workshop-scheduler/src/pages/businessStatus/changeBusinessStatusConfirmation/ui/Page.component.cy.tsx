import {
  ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  ACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  ACTIVATE_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE,
  DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  DEACTIVATE_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'
import { createSearchParams } from 'react-router'

import { ChangeBusinessStatusSearchParams } from '@/entities/businessStatus'

import ChangeBusinessStatusConfirmationPage from './Page'

const BUSINESS_STATUS_ID = '1'

const getSearchParamsString = (params: ChangeBusinessStatusSearchParams) => createSearchParams(params).toString()

describe('ChangeBusinessStatusConfirmationPage', () => {
  describe('renders correctly', () => {
    it('renders the confirmation modal correctly', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.contains('Status Change').should('be.visible')

      cy.contains('Are you sure you want to change the status?').should('be.visible')

      cy.get('button[aria-label="confirm"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })
  })

  describe('isAdditionalBusinessStatus is false', () => {
    it('executes the activate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'ActivateBusinessStatus')) {
          aliasMutation(req, 'ActivateBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, ACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlActivateBusinessStatusMutation')
    })

    it('executes the deactivate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'deactivate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateBusinessStatus')) {
          aliasMutation(req, 'DeactivateBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlDeactivateBusinessStatusMutation')
    })

    it('displays feature-specific server-side error when activating', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'ActivateBusinessStatus')) {
          aliasMutation(req, 'ActivateBusinessStatus')
          errorResponse(req, ACTIVATE_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.get('button[aria-label="confirm"]').click()
      cy.wait('@gqlActivateBusinessStatusMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'At least one business status must be active.')
    })

    it('displays feature-specific server-side error when deactivating', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateBusinessStatus')) {
          aliasMutation(req, 'DeactivateBusinessStatus')
          errorResponse(req, DEACTIVATE_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'deactivate',
            isAdditionalBusinessStatus: 'false',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.get('button[aria-label="confirm"]').click()
      cy.wait('@gqlDeactivateBusinessStatusMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'At least one business status must be active.')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    it('executes the activate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'true',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'ActivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'ActivateAdditionalBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlActivateAdditionalBusinessStatusMutation')
    })

    it('executes the deactivate mutation when the required search params are present', () => {
      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'deactivate',
            isAdditionalBusinessStatus: 'true',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'DeactivateAdditionalBusinessStatus')

          expect(req.body.variables).to.deep.equal({
            id: '1',
          })

          successResponse(req, DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="confirm"]').click()

      cy.wait('@gqlDeactivateAdditionalBusinessStatusMutation')
    })

    it('displays feature-specific server-side error when activating', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'ActivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'ActivateAdditionalBusinessStatus')
          errorResponse(req, ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'activate',
            isAdditionalBusinessStatus: 'true',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.get('button[aria-label="confirm"]').click()
      cy.wait('@gqlActivateAdditionalBusinessStatusMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should(
        'include.text',
        'At least one additional business status must be active.',
      )
    })

    it('displays feature-specific server-side error when deactivating', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'DeactivateAdditionalBusinessStatus')) {
          aliasMutation(req, 'DeactivateAdditionalBusinessStatus')
          errorResponse(req, DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.mountWithProviders(<ChangeBusinessStatusConfirmationPage />, {
        initialRouteEntries: [
          `/business-status/${BUSINESS_STATUS_ID}/change-status-confirmation?${getSearchParamsString({
            type: 'deactivate',
            isAdditionalBusinessStatus: 'true',
          })}`,
        ],
        route: '/business-status/:id/change-status-confirmation',
      })

      cy.get('button[aria-label="confirm"]').click()
      cy.wait('@gqlDeactivateAdditionalBusinessStatusMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should(
        'include.text',
        'At least one additional business status must be active.',
      )
    })
  })
})
