import { Tabs } from './Tabs'

const items = [
  {
    id: '1',
    header: 'Header 1',
    children: 'Content 1',
  },
  {
    id: '2',
    header: 'Header 2',
    children: 'Content 2',
  },
]

describe('Tabs component', () => {
  it('should render the tabs items and mark the first tab as active', () => {
    cy.mount(<Tabs items={items} />)

    cy.get('[data-pc-section="header"]').should('have.length', items.length)
    cy.get('[data-pc-section="headeraction"]').first().should('have.attr', 'aria-selected', 'true')
  })

  it('should not be rendered with no items', () => {
    cy.mount(<Tabs items={[]} />)

    cy.get('[data-pc-section="header"]').should('not.exist')
  })

  it('should toggles the active state of a tab when clicking the tab header', () => {
    cy.mount(<Tabs items={items} />)

    cy.get('[data-pc-section="headeraction"]').first().should('have.attr', 'aria-selected', 'true')
    cy.get('[data-pc-section="headeraction"]').last().should('have.attr', 'aria-selected', 'false')

    cy.get('[data-pc-section="headeraction"]').last().click()

    cy.get('[data-pc-section="headeraction"]').first().should('have.attr', 'aria-selected', 'false')
    cy.get('[data-pc-section="headeraction"]').last().should('have.attr', 'aria-selected', 'true')
  })
})
