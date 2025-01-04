import { format } from 'date-fns'

import { SearchForm } from './SearchForm'

describe('SearchForm component', () => {
  beforeEach(() => {
    const onSearchClickSpy = cy.spy().as('onSearchClickSpy')

    cy.mountWithProviders(<SearchForm onSearch={onSearchClickSpy} />)
  })

  it('should trigger the search after clicking the search button', () => {
    cy.contains('search').click()
    cy.get('@onSearchClickSpy').should('have.been.called')
  })

  describe('Customer birth date form field', () => {
    it('should format the date correctly', () => {
      cy.get('[data-pc-name="calendar"]').click().type('011199')
      cy.get('input').eq(0).click()
      cy.get('[data-pc-name="calendar"]').find('input').should('have.value', '01.11.1999')

      cy.get('[data-pc-name="calendar"]').find('input').click().clear().type('01112005')
      cy.get('input').eq(0).click()
      cy.get('[data-pc-name="calendar"]').find('input').should('have.value', '01.11.2005')

      cy.get('[data-pc-name="calendar"]').find('input').click().clear().type('01.01.2005')
      cy.get('input').eq(0).click()
      cy.get('[data-pc-name="calendar"]').find('input').should('have.value', '01.01.2005')

      cy.get('[data-pc-name="calendar"]').find('input').click().clear().type('www')
      cy.get('input').eq(0).click()
      cy.get('[data-pc-name="calendar"]').find('input').should('have.value', '01.01.2005')
    })

    it.only('should fallback to current date if format is incorrect', () => {
      const currentFormattedDate = format(new Date(), 'dd.MM.yyyy')

      cy.get('[data-pc-name="calendar"]').click().type('www')
      cy.get('input').eq(0).click()
      cy.get('[data-pc-name="calendar"]').find('input').should('have.value', currentFormattedDate)

      cy.get('[data-pc-name="calendar"]').find('input').click().clear().type('01-02-2000')
      cy.get('input').eq(0).click()
      cy.get('[data-pc-name="calendar"]').find('input').should('have.value', currentFormattedDate)
    })
  })
})
