import { EntityStatusDropdown } from './EntityStatusDropdown'

describe('EntityStatusDropdown', () => {
  it('should have passed value', () => {
    const onChangeMock = cy.stub()

    cy.mountWithProviders(<EntityStatusDropdown value onChange={onChangeMock} />)

    cy.get('span').should('contain.text', 'active')
  })

  it('should call onChange when dropdown value changes', () => {
    const onChangeMock = cy.stub()

    cy.mountWithProviders(<EntityStatusDropdown value onChange={onChangeMock} />)

    cy.get('[data-pc-name="dropdown"]').click()
    cy.get(`[data-pc-section="item"]:contains(inactive)`).click()

    cy.wrap(onChangeMock).should('have.been.calledOnce')
    cy.wrap(onChangeMock).should('have.been.calledWithMatch', { value: false })
  })
})
