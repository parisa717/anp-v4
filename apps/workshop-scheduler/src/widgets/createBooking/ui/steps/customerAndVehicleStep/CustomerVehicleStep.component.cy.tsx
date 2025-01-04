import { CustomerAndVehicleStep } from './CustomerAndVehicleStep'

describe('CustomerAndVehicleStep component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<CustomerAndVehicleStep />)

    cy.contains('Customer & vehicle').should('be.visible')
    cy.contains('Add draft of customer').should('be.visible')
    cy.contains('Find a Customer & vehicle or add the new one').should('be.visible')
  })
})
