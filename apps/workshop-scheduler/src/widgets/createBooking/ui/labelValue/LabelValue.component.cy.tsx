import { LabelValue } from './LabelValue'

const LABEL = 'label'
const VALUE = 'value'

describe('LabelValue component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<LabelValue value={VALUE} label={LABEL} />)

    cy.contains(VALUE).should('be.visible')
    cy.contains(LABEL).should('be.visible')
  })

  it('should render the dash if there is no value', () => {
    cy.mountWithProviders(<LabelValue value="" label={LABEL} />)

    cy.contains('-').should('be.visible')
    cy.contains(LABEL).should('be.visible')
  })
})
