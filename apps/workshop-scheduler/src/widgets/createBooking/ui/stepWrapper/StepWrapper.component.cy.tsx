import { StepWrapper } from './StepWrapper'

const childrenComponent = 'children'
const footerComponent = 'footer'

describe('StepWrapper component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<StepWrapper footer={footerComponent}>{childrenComponent}</StepWrapper>)

    cy.contains(childrenComponent).should('be.visible')
    cy.contains(footerComponent).should('be.visible')
  })
})
