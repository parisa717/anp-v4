import { FOLLOWUP_WORK, GET_QUALIFICATIONS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import EditFollowUpWorkModal from './EditFollowUpWorkModal'

const SAVE_BUTTON = 'button[aria-label="save"]'
const CANCEL_BUTTON = 'button[aria-label="cancel"]'
const FORM_MODAL = '[data-cy="form-modal"]'

const QUALIFICATIONS = GET_QUALIFICATIONS_DEFAULT_RESPONSE.getQualifications.qualifications

describe('EditWorkModal', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopFollowUpWork')) {
        aliasQuery(req, 'GetWorkshopFollowUpWork')
        successResponse(req, {
          getWorkshopFollowUpWork: FOLLOWUP_WORK,
        })
      }
    })
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        if (hasOperationName(req, 'GetQualifications')) {
          aliasQuery(req, 'GetQualifications')
          successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
        }
      }
    })

    cy.mountWithProviders(<EditFollowUpWorkModal />)

    cy.wait('@gqlGetWorkshopFollowUpWorkQuery')
    cy.wait('@gqlGetQualificationsQuery')
  })

  it('renders the form with default fields and checks default values', () => {
    cy.wait(3000)

    cy.get(FORM_MODAL).should('be.visible')
    cy.contains('Edit service').should('be.visible')

    cy.get('input[name="name"]').should('be.visible').should('have.value', FOLLOWUP_WORK.name)

    cy.get('input[name="isDescriptionEditable"]').should('not.be.checked')

    cy.get('input[name="isCapacityEditable"]').should('not.be.checked')

    cy.get('#qualificationId')
      .within(() => {
        cy.get('[data-pc-section="input"]').should('have.value', QUALIFICATIONS[0].name)
      })
      .should('be.visible')

    cy.get('#timeUnits').should('be.visible').should('have.value', '100')

    cy.contains('cancel').should('be.visible')
    cy.contains('save').should('be.visible')
  })

  it('submits the form with valid data', () => {
    cy.wait(3000)

    cy.get('input[name="name"]').clear().type('Test')

    cy.get('#isDescriptionEditable').should('be.visible').click()
    cy.get('input[name="isDescriptionEditable"]').check()
    cy.get('#isCapacityEditable').should('be.visible').click()
    cy.get('input[name="isCapacityEditable"]').check()

    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateWorkshopFollowUpWork')) {
        aliasMutation(req, 'UpdateWorkshopFollowUpWork')
        expect(req.body.variables).to.deep.equal({
          workshopFollowUpWork: {
            id: '',
            name: 'Test',
            timeUnits: 100,
            qualification: { id: '1' },
            isDescriptionEditable: true,
            isCapacityEditable: true,
          },
        })
        successResponse(req, { data: { updateWorkshopFollowUpWork: { success: true } } })
      }
    })
    cy.wait(3000)

    cy.get(SAVE_BUTTON).click()
    cy.wait('@gqlUpdateWorkshopFollowUpWorkMutation')

    cy.get(FORM_MODAL).should('not.exist')
  })

  it('cancels the form and navigates back', () => {
    cy.get(CANCEL_BUTTON).click()
    cy.get(FORM_MODAL).should('not.exist')
  })
})
