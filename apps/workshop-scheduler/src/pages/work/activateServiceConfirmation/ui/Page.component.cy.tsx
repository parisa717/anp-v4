import { ACTIVATE_WORKSHOP_WORK_SERVER_SIDE_ERROR_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import ActivateServiceConfirmationPage from './Page'

const WORK_ID = '1'

describe('ActivateServiceConfirmationPage component', () => {
  beforeEach(() => {
    cy.mountWithProviders(<ActivateServiceConfirmationPage />, {
      initialRouteEntries: [`/work/${WORK_ID}/activate-service`],
      route: '/work/:id/activate-service',
    })
  })

  it('renders the dialog correctly', () => {
    cy.contains('[data-pc-section="header"]', 'Status change').should('be.visible')
    cy.contains('p', 'Are you sure you want to change the status?').should('be.visible')

    cy.get('[aria-label="cancel"]').should('be.visible')
    cy.get('[aria-label="confirm"]').should('be.visible')
  })

  it('closes the dialog when cancel is clicked', () => {
    cy.get('[aria-label="cancel"]').click()
    cy.get('Status change').should('not.exist')
  })

  it('fires the activate service request when submit is clicked', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'ActivateWorkshopWork')) {
        aliasMutation(req, 'ActivateWorkshopWork')

        expect(req.body.variables).to.deep.equal({
          id: WORK_ID,
        })

        successResponse(req, {
          activateWorkshopWork: {
            status: true,
          },
        })
      }
    })

    cy.get('[aria-label="confirm"]').click()
    cy.wait('@gqlActivateWorkshopWorkMutation')
    cy.get('Status change').should('not.exist')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'ActivateWorkshopWork')) {
        aliasMutation(req, 'ActivateWorkshopWork')
        errorResponse(req, ACTIVATE_WORKSHOP_WORK_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<ActivateServiceConfirmationPage />, {
      initialRouteEntries: ['/work/1/activate-service'],
      route: '/work/:id/activate-service',
    })

    cy.get('[aria-label="confirm"]').click()
    cy.wait('@gqlActivateWorkshopWorkMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Work not found.')
  })
})
