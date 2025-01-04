import { MinimalLocationOverbookingAppliedInfoModal } from './MinimalLocationOverbookingAppliedInfoModal'

describe('MinimalLocationOverbookingAppliedInfoModal component', () => {
  beforeEach(() => {
    const onConfirmClickSpy = cy.spy().as('onConfirmClickSpy')

    cy.mountWithProviders(
      <MinimalLocationOverbookingAppliedInfoModal
        visible
        onCancelClick={() => {}}
        onConfirmClick={onConfirmClickSpy}
      />,
    )
  })

  it('should render the correct content', () => {
    cy.contains('[data-pc-section="header"]', 'Information').should('be.visible')
    cy.contains(
      'p',
      'The change has been automatically transferred to the setup of the admin user for this location. Please check this for correctness.',
    ).should('be.visible')
    cy.get('[data-cy="confirm-button"]').should('be.visible').and('contain', 'ok')
  })

  it('should close the dialog when OK button is clicked', () => {
    cy.get('[data-cy="confirm-button"]').click()
    cy.get('@onConfirmClickSpy').should('have.been.called')
  })
})
