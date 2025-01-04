import { LocationDetailsTabs } from './LocationDetailsTabs'

const SELECTED_TAB_CLASS = 'p-tabview-selected'

describe('Tabs', () => {
  beforeEach(() => {
    cy.mountWithProviders(<LocationDetailsTabs />)
  })

  it('should display tabs with selected Services as default activeIndex', () => {
    cy.contains('Services').parent().should('have.class', SELECTED_TAB_CLASS)
    cy.contains('Overbooking Setup').parent().should('not.have.class', SELECTED_TAB_CLASS)
    cy.contains('Connected Locations').parent().should('not.have.class', SELECTED_TAB_CLASS)
  })

  it('should switch between tabs and display the correct content', () => {
    cy.contains('Overbooking Setup').click()
    cy.contains('Overbooking Setup').parent().should('have.class', SELECTED_TAB_CLASS)
    cy.contains('Services').parent().should('not.have.class', SELECTED_TAB_CLASS)
    cy.contains('Connected Locations').parent().should('not.have.class', SELECTED_TAB_CLASS)

    cy.contains('Connected Locations').click()
    cy.contains('Connected Locations').parent().should('have.class', SELECTED_TAB_CLASS)
    cy.contains('Services').parent().should('not.have.class', SELECTED_TAB_CLASS)
    cy.contains('Overbooking Setup').parent().should('not.have.class', SELECTED_TAB_CLASS)
  })
})
