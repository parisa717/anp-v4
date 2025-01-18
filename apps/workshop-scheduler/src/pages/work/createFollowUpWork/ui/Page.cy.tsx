import {
  CREATE_WORKSHOP_FOLLOW_UP_WORK_SERVER_SIDE_ERROR_RESPONSE,
  GET_QUALIFICATIONS_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import CreateFollowUpWork from './Page'

const FORM_MODAL = '[data-cy="form-modal"]'
const SAVE_BUTTON = 'button[aria-label="save"]'
const CANCEL_BUTTON = 'button[aria-label="cancel"]'
const HEADER = 'h2'

describe('CreateFollowUpWork', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        aliasQuery(req, 'GetQualifications')
        successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<CreateFollowUpWork />)
    cy.wait('@gqlGetQualificationsQuery')
  })

  it('renders the modal with the form and default title', () => {
    cy.get(FORM_MODAL).should('be.visible')
    cy.get(HEADER).contains('Add service').should('be.visible')
  })

  it('displays validation errors for required fields when Save is clicked', () => {
    cy.get(SAVE_BUTTON).click()
    cy.get('.text-error').filter(':contains("This field is required")').should('have.length', 2)
  })

  it('navigates to the root page when Cancel is clicked', () => {
    cy.get(CANCEL_BUTTON).click()
    cy.get(FORM_MODAL).should('not.exist')
  })

  it('submits valid form data and navigates to the root page', () => {
    cy.get('input[name="name"]').type('Test Follow-Up Work')
    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('input[name="timeUnits"]').clear().type('600')

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateWorkshopFollowUpWork')) {
        aliasMutation(req, 'CreateWorkshopFollowUpWork')

        expect(req.body.variables.workshopFollowUpWork).to.deep.equal({
          name: 'Test Follow-Up Work',
          qualification: { id: '1' },
          timeUnits: 600,
          isDescriptionEditable: false,
          isCapacityEditable: false,
          isActive: true,
        })

        successResponse(req, { data: { createWorkshopFollowUpWork: { success: true } } })
      }
    })

    cy.get(SAVE_BUTTON).click()

    cy.wait('@gqlCreateWorkshopFollowUpWorkMutation')

    cy.get(FORM_MODAL).should('not.exist')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateWorkshopFollowUpWork')) {
        aliasMutation(req, 'CreateWorkshopFollowUpWork')
        errorResponse(req, CREATE_WORKSHOP_FOLLOW_UP_WORK_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<CreateFollowUpWork />, {
      initialRouteEntries: ['/work/add-followup-work'],
      route: '/work/add-followup-work',
    })

    cy.get('input[name="name"]').type('Test Follow-Up Work')
    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('input[name="timeUnits"]').clear().type('600')

    cy.get(SAVE_BUTTON).click()

    cy.wait('@gqlCreateWorkshopFollowUpWorkMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Follow Up Work already exists.')
  })
})
