import { Topbar } from './Topbar'

describe('Topbar component', () => {
  it('renders the correct title', () => {
    cy.mount(<Topbar title="Topbar component" />)

    cy.get('[data-cy="topbar-title"]').should('have.text', 'AVAGTopbarcomponent')
  })

  it('renders sub title using correct colors', () => {
    cy.mount(<Topbar title="Topbar component" />)

    cy.get('[data-cy="topbar-subtitle"]')
      .children()
      .eq(0)
      .should('have.attr', 'class')
      .and('contain', 'text-theme-primary')
    cy.get('[data-cy="topbar-subtitle"]')
      .children()
      .eq(1)
      .should('have.attr', 'class')
      .and('not.contain', 'text-theme-primary')
  })

  it('renders left and right items', () => {
    cy.mount(
      <Topbar
        title="Topbar component"
        left={
          <>
            <div>1st</div>
            <div>2nd</div>
          </>
        }
        right={
          <>
            <div>3rd</div>
            <div>4th</div>
          </>
        }
      />,
    )

    cy.get('[data-cy="topbar-left"]').children().should('have.length', 2)
    cy.get('[data-cy="topbar-left"]').children().eq(0).should('have.text', '1st')
    cy.get('[data-cy="topbar-left"]').children().eq(1).should('have.text', '2nd')

    cy.get('[data-cy="topbar-right"]').children().should('have.length', 2)
    cy.get('[data-cy="topbar-right"]').children().eq(0).should('have.text', '3rd')
    cy.get('[data-cy="topbar-right"]').children().eq(1).should('have.text', '4th')
  })
})
