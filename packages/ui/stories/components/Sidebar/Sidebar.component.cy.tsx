import { Menu } from 'primereact/menu'

import { Sidebar } from './Sidebar'

beforeEach(() => {
  const model = [
    {
      label: 'main menu',
      items: [
        {
          label: 'dashboard',
          icon: 'pi pi-th-large',
        },
        {
          label: 'dates',
          icon: 'pi pi-list',
        },
      ],
    },
  ]

  cy.mount(
    <Sidebar>
      <Menu model={model} />
    </Sidebar>,
  )
})

describe('Sidebar component', () => {
  it('renders the menu items', () => {
    cy.get('[data-pc-section="menuitem"]').should('have.length', 2)
  })

  it('toggles sidebar and the menu items when clicking the button', () => {
    cy.get('[data-pc-section="submenuheader"]').should('be.visible')
    cy.get('[data-pc-section="label"]').should('be.visible')

    cy.get('[data-cy="sidebar-button"]').click()

    cy.get('[data-pc-section="submenuheader"]').should('not.be.visible')
    cy.get('[data-pc-section="label"]').should('not.be.visible')
  })
})
