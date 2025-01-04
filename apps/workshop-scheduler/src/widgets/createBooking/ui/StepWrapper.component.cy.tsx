import { StepWrapper } from './StepWrapper'

const childrenComponent = 'children'

describe('StepWrapper component', () => {
  beforeEach(() => {
    const onCancelClickSpy = cy.spy().as('onCancelClickSpy')
    const onNextClickSpy = cy.spy().as('onNextClickSpy')
    const onPrevClickSpy = cy.spy().as('onPrevClickSpy')

    cy.mountWithProviders(
      <StepWrapper
        onNext={onNextClickSpy}
        onPrev={onPrevClickSpy}
        onCancel={onCancelClickSpy}
        isFirstStep={true}
        isLastStep={false}
      >
        {childrenComponent}
      </StepWrapper>,
    )
  })

  it('should render correctly', () => {
    cy.contains(childrenComponent).should('be.visible')
    cy.contains('cancel').should('be.visible')
    cy.contains('back').should('not.exist')
    cy.contains('next').should('be.visible')
  })

  it('should trigger onNext callback when NEXT button is clicked', () => {
    cy.contains('next').click()
    cy.get('@onNextClickSpy').should('have.been.called')
  })

  it('should trigger onCancel callback when CANCEL button is clicked', () => {
    cy.contains('cancel').click()
    cy.get('@onCancelClickSpy').should('have.been.called')
  })

  it('should trigger onPrev callback when BACK button is clicked', () => {
    const onPrevClickSpy = cy.spy().as('onPrevClickSpy')

    cy.mountWithProviders(
      <StepWrapper onNext={() => {}} onPrev={onPrevClickSpy} onCancel={() => {}} isFirstStep={false} isLastStep={false}>
        {childrenComponent}
      </StepWrapper>,
    )

    cy.contains('back').click()
    cy.get('@onPrevClickSpy').should('have.been.called')
  })

  it('should not contain BACK button on the first step', () => {
    cy.contains('back').should('not.exist')
  })

  it('should not contain NEXT button on the last step', () => {
    cy.mountWithProviders(
      <StepWrapper onNext={() => {}} onPrev={() => {}} onCancel={() => {}} isFirstStep={false} isLastStep={true}>
        {childrenComponent}
      </StepWrapper>,
    )

    cy.contains('next').should('not.exist')
  })
})
