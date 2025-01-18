import { DataTableCheckedDropdown } from './DataTableCheckedDropdown'

describe('DataTableCheckedDropdown component', () => {
  it('should have passed value', () => {
    const onChangeMock = cy.stub()

    cy.mount(<DataTableCheckedDropdown value onChange={onChangeMock} />)

    cy.get('span').should('contain.text', 'checked')
  })

  it('should call onChange when dropdown value changes', () => {
    const onChangeMock = cy.stub()

    cy.mount(<DataTableCheckedDropdown value onChange={onChangeMock} />)

    cy.get('[data-pc-name="dropdown"]').click()
    cy.get(`[data-pc-section="item"]:contains(unchecked)`).click()

    cy.wrap(onChangeMock).should('have.been.calledOnce')
    cy.wrap(onChangeMock).should('have.been.calledWithMatch', { value: false })
  })
})
