import { DataTableSearchInput } from './DataTableSearchInput'

describe('DataTableSearchInput component', () => {
  it('Renders the component with the correct value', () => {
    cy.mount(<DataTableSearchInput value={'hello'} filterApplyCallback={() => {}} />)

    cy.get('[data-cy="search-input"]').should('have.value', 'hello')
  })

  it('Calls filterApplyCallback props with the query string when typing on the input', () => {
    const handleFilterApplyCallback = cy.spy().as('handleFilterApplyCallback')

    cy.mount(<DataTableSearchInput value={''} filterApplyCallback={handleFilterApplyCallback} />)

    cy.get('[data-cy="search-input"]').focus().realType('123')

    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', '1')
    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', '2')
    cy.get('@handleFilterApplyCallback').should('have.been.calledWith', '3')
  })
})
