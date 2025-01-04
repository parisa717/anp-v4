import { TimeGutterHeader } from './TimeGutterHeader'

describe('TimeGutterHeader', () => {
  it('shows label properly', () => {
    const labelText = 'all day'
    cy.mountWithProviders(<TimeGutterHeader />)
    cy.contains(labelText).should('be.visible')
  })
})
