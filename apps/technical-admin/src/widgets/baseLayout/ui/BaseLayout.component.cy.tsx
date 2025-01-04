import { t } from 'i18next'

import { BaseLayout } from '@/widgets/baseLayout'
import { getMenuItems } from '@/widgets/baseLayout/lib/getMenuItems'

describe('BaseLayout', () => {
  beforeEach(() => {
    cy.mountWithProviders(<BaseLayout />)
  })

  it('renders the menu', () => {
    getMenuItems(t).forEach((menuItem) => {
      if (menuItem.label) {
        cy.contains(menuItem.label).should('be.visible')
      }
    })
  })

  it('renders the topbar with the app title, user info and sign out button', () => {
    cy.get('[data-cy="topbar"]').should('include.text', 'AVAGAdminPortal').and('include.text', 'JDJohn Doe')
    cy.get('[data-cy="sign-out-button"]').should('have.attr', 'aria-label', 'sign out')
    cy.get('[data-cy="sign-out-button"]').get('[data-pc-section="icon"]').should('include.class', 'pi-sign-out')
  })
})
