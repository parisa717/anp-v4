import { ProfileButton } from './ProfileButton'

describe('Layout component', () => {
  it('Renders the component with the correct text', () => {
    cy.mount(<ProfileButton fullName="Edmund Blackadder" />)

    cy.get('[data-cy=profile-button]').should('have.text', 'EBEdmund Blackadder')
  })
})
