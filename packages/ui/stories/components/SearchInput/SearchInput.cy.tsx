import React from 'react'

import { SearchInput } from './SearchInput'

describe('SearchInput component', () => {
  it('Renders the component with the correct value', () => {
    cy.mount(<SearchInput value={'hello'} onSearch={() => {}} />)

    cy.get('[data-cy="search-input"]').should('have.value', 'hello')
  })

  it('Calls onSearch props with the query string when typing on the input', () => {
    const onChange = cy.spy().as('onChange')

    cy.mount(<SearchInput value={''} onSearch={onChange} />)

    cy.get('[data-cy="search-input"]').focus().realType('123')

    cy.get('@onChange').should('have.been.calledWith', '1')
    cy.get('@onChange').should('have.been.calledWith', '2')
    cy.get('@onChange').should('have.been.calledWith', '3')
  })

  it('Calls onSearch props with the empty string when clicking "x" button', () => {
    const onChange = cy.spy().as('onChange')

    cy.mount(<SearchInput value={'hello'} onSearch={onChange} />)

    cy.get('[data-cy="search-input-clear"]').focus().realPress('Enter')

    cy.get('@onChange').should('have.been.calledWith', '')
  })
})
