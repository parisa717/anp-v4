import CounterConfigurationPage from './Page'

describe('CounterConfigurationPage component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<CounterConfigurationPage />)

    cy.contains('Counter Configuration')
  })
})
