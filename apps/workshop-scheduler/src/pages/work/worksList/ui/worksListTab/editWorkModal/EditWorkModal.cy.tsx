import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE, GET_QUALIFICATIONS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import EditWorkModal from './EditWorkModal'

const CANCEL_BUTTON = 'button[aria-label="cancel"]'
const SKIP_AND_SAVE_BUTTON = 'button[aria-label="Skip & save"]'
const NEXT_BUTTON = 'button[aria-label="Next"]'

const WORKSHOP_WORK = {
  id: '1',
  name: 'Suspension and Steering Service',
  isCapacityEditable: false,
  isDescriptionEditable: false,
  isActive: true,
  qualification: { id: '0', name: 'Mechanics' },
  brands: [{ id: 'brand_1', name: 'Opel', timeUnits: 100 }],
}

const QUALIFICATIONS = GET_QUALIFICATIONS_DEFAULT_RESPONSE.getQualifications.qualifications
const BRANDS = GET_BRANDS_OPERATION_DEFAULT_RESPONSE.getBrands.brands

describe('EditWorkModal', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopWork')) {
        aliasQuery(req, 'GetWorkshopWork')
        successResponse(req, {
          getWorkshopWork: WORKSHOP_WORK,
        })
      }
    })
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

    cy.mountWithProviders(<EditWorkModal />)

    cy.wait('@gqlGetWorkshopWorkQuery')
    cy.wait('@gqlGetBrandsQuery')
    cy.wait('@gqlGetQualificationsQuery')
  })

  it('renders the form with default fields and checks default values', () => {
    cy.wait(3000)

    cy.contains('Edit service').should('be.visible')

    cy.get('input[name="name"]').should('be.visible').should('have.value', WORKSHOP_WORK.name)

    cy.get('input[name="isDescriptionEditable"]').should('exist').should('not.be.checked')

    cy.get('input[name="isCapacityEditable"]').should('exist').should('not.be.checked')

    cy.get('#qualificationId')
      .within(() => {
        cy.get('[data-pc-section="input"]').should('have.value', QUALIFICATIONS[0].name)
      })
      .should('be.visible')

    cy.get('#brands\\.0\\.id')
      .within(() => {
        cy.get('[data-pc-section="input"]').should('have.value', BRANDS[0].code)
      })
      .should('be.visible')

    cy.get('#brands\\.0\\.timeUnits').should('be.visible').should('have.value', '100')

    cy.contains('cancel').should('be.visible')
    cy.contains('save').should('be.visible')
  })

  it('submits the form with valid data', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasMutation(req, 'UpdateWorkshopWork')

      expect(req.body.variables).to.deep.equal({
        workshopWork: {
          id: '',
          name: 'Test',
          qualification: { id: '1' },
          isDescriptionEditable: true,
          isCapacityEditable: true,
          brands: [{ id: 'brand_1', timeUnits: 100 }],
        },
      })
    })

    cy.wait(3000)
    cy.contains('Edit service').should('be.visible')

    cy.get('input[name="name"]').clear().type('Test')

    cy.get('input[name="isDescriptionEditable"]').check()
    cy.get('input[name="isCapacityEditable"]').check()

    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()

    cy.get(SKIP_AND_SAVE_BUTTON).click()
    cy.wait('@gqlUpdateWorkshopWorkMutation')
  })

  it('displays warning modal when new brand is added to the form', () => {
    cy.wait(3000)

    cy.get('#brands\\.0\\.id').click()
    cy.contains('Nissan').click()

    cy.get(NEXT_BUTTON).click()

    cy.get('[data-cy="brands-warning-modal"]').should('exist')
  })

  it('displays assign locations modal when in warning modal will be selected option to assign locations', () => {
    cy.wait(3000)

    cy.get('#brands\\.0\\.id').click()
    cy.contains('Nissan').click()

    cy.get(NEXT_BUTTON).click()

    cy.contains('Warning').should('be.visible')

    cy.get('button[aria-label="assign locations"]').click()

    cy.get('[data-cy="assign-locations-modal"]').should('exist')
  })

  it('cancels the form and navigates back', () => {
    cy.wait(3000)

    cy.get(CANCEL_BUTTON).click()
    cy.contains('Edit service').should('not.exist')
  })
})
