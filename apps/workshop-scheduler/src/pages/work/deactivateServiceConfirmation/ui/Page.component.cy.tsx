import { DEACTIVATE_WORKSHOP_WORK_SERVER_SIDE_ERROR_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import DeactivateServiceConfirmationPage from './Page'

const WORK_ID = '1'

describe('DeactivateServiceConfirmationPage component', () => {
  beforeEach(() => {
    cy.mountWithProviders(<DeactivateServiceConfirmationPage />, {
      initialRouteEntries: [`/work/${WORK_ID}/deactivate-service`],
      route: '/work/:id/deactivate-service',
    })
  })

  it('should render the dialog correctly', () => {
    cy.contains('[data-pc-section="header"]', 'Warning').should('be.visible')
    cy.contains(
      'p',
      'If you set the status to inactive, the location assignments will be revoked, and the work to be done will no longer be available in the appointment scheduling process. Saved appointments are exempt from the status change.',
    ).should('be.visible')

    cy.get('[aria-label="cancel"]').should('be.visible')
    cy.get('[aria-label="confirm"]').should('be.visible')
  })

  it('should close the dialog when cancel is clicked', () => {
    cy.get('[aria-label="cancel"]').click()
    cy.get('Warning').should('not.exist')
  })

  it('should fire the deactivate service request when submit is clicked', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'DeactivateWorkshopWork')) {
        aliasMutation(req, 'DeactivateWorkshopWork')

        expect(req.body.variables).to.deep.equal({
          id: WORK_ID,
        })

        successResponse(req, {
          deactivateWorkshopWork: {
            status: true,
          },
        })
      }
    })

    cy.get('[aria-label="confirm"]').click()
    cy.wait('@gqlDeactivateWorkshopWorkMutation')
    cy.get('Warning').should('not.exist')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'DeactivateWorkshopWork')) {
        aliasMutation(req, 'DeactivateWorkshopWork')
        errorResponse(req, DEACTIVATE_WORKSHOP_WORK_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<DeactivateServiceConfirmationPage />, {
      initialRouteEntries: ['/work/:id/deactivate-service'],
      route: '/work/:id/deactivate-service',
    })

    cy.get('[aria-label="confirm"]').click()
    cy.wait('@gqlDeactivateWorkshopWorkMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Work not found.')
  })
})
