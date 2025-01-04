import { Layout } from '@/shared/ui'

const menuItems = [
  {
    label: 'dashboard',
    icon: 'pi pi-palette',
    url: 'dashboard',
  },
  {
    label: 'appointments',
    icon: 'pi pi-link',
    url: 'appointments',
  },
]

describe('Layout', () => {
  beforeEach(() => {
    cy.mountWithProviders(<Layout userFullName="John Doe" isLoggedIn menuItems={menuItems} />)
  })

  it('should render the nav menu with the menu items', () => {
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').should('have.length', 2)
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').eq(0).should('have.text', 'dashboard')
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').eq(1).should('have.text', 'appointments')
  })

  it('should open the booking process when click the Book an Appointment button', () => {
    cy.contains('Book an appointment').click()

    cy.get('[data-pc-name="dialog"]').should('be.visible')
  })
})
