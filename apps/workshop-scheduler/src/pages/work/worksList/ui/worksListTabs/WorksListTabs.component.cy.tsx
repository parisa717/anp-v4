import { WorksListTabs } from './WorksListTabs'

const SELECTED_TAB_CLASS = 'p-tabview-selected'

describe('WorksListTabs component', () => {
  beforeEach(() => {
    cy.mountWithProviders(<WorksListTabs />)
  })

  it('should display tabs with selected Works List as default activeIndex', () => {
    cy.contains('List of work to be carried out').parent().should('have.class', SELECTED_TAB_CLASS)
    cy.contains('Work to be done for follow-up appointments').parent().should('not.have.class', SELECTED_TAB_CLASS)
  })

  it('should switch between tabs and display the correct content', () => {
    cy.contains('Work to be done for follow-up appointments').click()
    cy.contains('Work to be done for follow-up appointments').parent().should('have.class', SELECTED_TAB_CLASS)
    cy.contains('List of work to be carried out').parent().should('not.have.class', SELECTED_TAB_CLASS)
  })
})
