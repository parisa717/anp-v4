import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE, GET_QUALIFICATIONS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import AddWorkPage from './Page'

const STEP_CONTENT = '[data-cy="step-content"]'
const NEXT_BUTTON = 'button[aria-label="Next"]'
const ADD_ALL_BRANDS_BUTTON = 'button[aria-label="Add all brands"]'
const CONFIRM_MODAL_BUTTON = 'button[aria-label="confirm"]'
const TIME_UNITS_INPUT = '[data-cy="time-units-input"]'
const HEADER = 'h2'

describe('AddWorkPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
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

    cy.mountWithProviders(<AddWorkPage />)

    cy.wait('@gqlGetBrandsQuery')
    cy.wait('@gqlGetQualificationsQuery')
  })

  it('renders the content with the first step active by default', () => {
    cy.get(HEADER).contains('Define service setup').should('be.visible')
    cy.get(STEP_CONTENT).contains('Define service setup').should('be.visible')
  })

  it('do not navigate navigate between steps when clicking on the stepper step and form is invalid', () => {
    cy.contains('Assign locations').click()
    cy.get(HEADER).contains('Assign locations').should('not.exist')
  })

  it('navigates between steps when clicking on the stepper step and form is valid', () => {
    cy.get('input[name="name"]').type('Test')
    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('#brands\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.get('input[name="brands.0.timeUnits"]').type('100')

    cy.contains('Assign locations').click()
    cy.get(HEADER).contains('Assign locations').should('be.visible')

    cy.contains('Define service setup').click()
    cy.get(HEADER).contains('Define service setup').should('be.visible')
  })

  it('navigates to the next step when form is valid and Next button is clicked', () => {
    cy.get('input[name="name"]').type('Test')
    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('#brands\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.get('input[name="brands.0.timeUnits"]').type('100')

    cy.get(HEADER).contains('Define service setup').should('be.visible')
    cy.get(NEXT_BUTTON).click()
    cy.get(HEADER).contains('Assign locations').should('be.visible')
  })

  it('do not navigate to the next step when Next button is clicked and form is invalid', () => {
    cy.get(HEADER).contains('Define service setup').should('be.visible')

    cy.get(NEXT_BUTTON).click()

    cy.get(HEADER).contains('Assign locations').should('not.exist')
  })

  it('checks error messages for each invalid field', () => {
    cy.get(NEXT_BUTTON).click()

    cy.get('.text-error').filter(':contains("This field is required")').should('have.length', 3)

    cy.get('.text-error').filter(':contains("Number must be greater than 0")').should('have.length', 1)
  })

  it('saves time units for all brands in the modal', () => {
    cy.get(ADD_ALL_BRANDS_BUTTON).click()
    cy.get(TIME_UNITS_INPUT).type('10')
    cy.get(CONFIRM_MODAL_BUTTON).click()

    cy.get('#brands\\.0\\.timeUnits').should('have.value', '10')
    cy.get('#brands\\.1\\.timeUnits').should('have.value', '10')
  })
})
