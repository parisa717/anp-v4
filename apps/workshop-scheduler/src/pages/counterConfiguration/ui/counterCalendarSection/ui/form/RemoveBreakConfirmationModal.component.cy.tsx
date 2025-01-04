import { RemoveBreakConfirmationModal } from './RemoveBreakConfirmationModal'

describe('RemoveBreakConfirmationModal component', () => {
  beforeEach(() => {
    const onCancelClickSpy = cy.spy().as('onCancelClickSpy')
    const onRemoveClickSpy = cy.spy().as('onRemoveClickSpy')

    cy.mountWithProviders(<RemoveBreakConfirmationModal onCancel={onCancelClickSpy} onRemove={onRemoveClickSpy} open />)
  })

  it('should render the correct content', () => {
    cy.get('[data-pc-name="dialog"]').should('exist')
    cy.get('[data-pc-section="headertitle"]').should('contain.text', 'Remove pause')
  })

  it('should trigger onCancel callback when CANCEL button is clicked', () => {
    cy.contains('cancel').click()
    cy.get('@onCancelClickSpy').should('have.been.called')
  })

  it('should trigger onRemove callback when REMOVE button is clicked', () => {
    cy.contains('confirm').click()
    cy.get('@onRemoveClickSpy').should('have.been.called')
  })
})
