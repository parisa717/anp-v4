import { GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE, GET_WORKSHOP_WORK_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { AssignLocationsModal } from './AssignLocationsModal'

const WORK = GET_WORKSHOP_WORK_DEFAULT_RESPONSE

const BRAND_NAME = WORK.brands[0].name.toUpperCase()
const LOCATIONS = GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations

const ACCORDION_HEADER = '.p-accordion-header'
const ACTIVE_ACCORDION = '.p-accordion-tab-active'
const CHECKBOX = '[data-pc-name="checkbox"]'
const SAVE_BUTTON = 'button[aria-label="Save"]'

describe('AssignLocationsModal', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(
      <AssignLocationsModal
        isOpen={true}
        work={WORK}
        onClose={cy.stub().as('onClose')}
        onSave={cy.stub().as('onSave')}
      />,
    )

    cy.wait('@gqlGetLocationsQuery')
  })

  it('should render the component with correct data', () => {
    cy.contains('Assign locations').should('be.visible')
    cy.contains('For service').should('be.visible')
    cy.contains(WORK.name).should('be.visible')
    cy.contains(BRAND_NAME).should('be.visible')
    cy.contains(WORK.brands[1].name.toUpperCase()).should('be.visible')
  })

  it('should render LocationTable', () => {
    cy.get(ACTIVE_ACCORDION).within(() => {
      LOCATIONS.forEach((location) => {
        cy.contains(location.name).should('be.visible')
      })
    })
  })

  it('should trigger onClose callback when clicking close button', () => {
    cy.get('@onClose').should('not.have.been.called')
    cy.contains('Back').click()
    cy.get('@onClose').should('have.been.calledOnce')
  })

  it('should keep saved data when closing accordion', () => {
    cy.get(ACTIVE_ACCORDION).within(() => {
      cy.get(CHECKBOX).first().click()
    })

    cy.contains(ACCORDION_HEADER, BRAND_NAME).click()

    cy.contains(ACCORDION_HEADER, BRAND_NAME).click()
    cy.get(ACTIVE_ACCORDION).within(() => {
      cy.get(CHECKBOX).get('[data-pc-section="input"]').should('be.checked')
    })
  })

  it('should run onSave when work has selected locations', () => {
    cy.get(ACTIVE_ACCORDION).within(() => {
      cy.get(CHECKBOX).first().click()
    })

    cy.get(SAVE_BUTTON).click()
    cy.get('@onSave').should('have.been.calledOnce')
  })
})
