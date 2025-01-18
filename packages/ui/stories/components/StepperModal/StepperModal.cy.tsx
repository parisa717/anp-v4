import { StepperModal } from './StepperModal'

const MODAL = '[data-pc-section="root"]'
const STEPS = '[data-pc-section="menu"]'
const STEP_CONTENT = '[data-cy="step-content"]'
const STEP_MENU_ITEM = '[data-pc-section="menuitem"]'
const STEP_ITEM = '[data-pc-section="step"]'

const MOCK_STEPS = [
  { label: 'Step 1', content: <div>Content for Step 1</div> },
  { label: 'Step 2', content: <div>Content for Step 2</div> },
  { label: 'Step 3', content: <div>Content for Step 3</div> },
]

describe('StepperModal', () => {
  it('renders the modal and displays the title and initial step content', () => {
    cy.mount(
      <StepperModal activeStepIndex={0} steps={MOCK_STEPS} stepsTitle="Test Steps" onStepperStepClick={() => {}} />,
    )

    cy.get(MODAL).should('exist')
    cy.contains('Test Steps').should('be.visible')
    cy.get(STEP_CONTENT).should('contain.text', 'Content for Step 1')
  })

  it('calls onStepChange when a step is selected', () => {
    const onStepperStepClick = cy.spy().as('onStepperStepClick')

    cy.mount(
      <StepperModal
        activeStepIndex={0}
        steps={MOCK_STEPS}
        stepsTitle="Test Steps"
        onStepperStepClick={onStepperStepClick}
      />,
    )

    cy.get(STEPS).find(STEP_ITEM).eq(1).click()
    cy.get('@onStepperStepClick').should('have.been.calledWith', 1)
  })

  it('displays active step correctly', () => {
    cy.mount(
      <StepperModal activeStepIndex={0} steps={MOCK_STEPS} stepsTitle="Test Steps" onStepperStepClick={() => {}} />,
    )

    cy.get(STEPS).find(STEP_MENU_ITEM).eq(0).should('have.class', 'p-steps-current')
    cy.get(STEPS).find(STEP_MENU_ITEM).eq(1).should('not.have.class', 'p-steps-current')
    cy.get(STEPS).find(STEP_MENU_ITEM).eq(2).should('not.have.class', 'p-steps-current')
  })

  it('renders correct width styles for secondary modals', () => {
    const MOCKED_STEPS_WITH_WIDTH = [
      { label: 'Step 1', content: <div>Content for Step 1</div>, width: 1440 },
      { label: 'Step 2', content: <div>Content for Step 2</div>, width: 1632 },
      { label: 'Step 3', content: <div>Content for Step 3</div>, width: 600 },
    ]

    cy.mount(
      <StepperModal
        activeStepIndex={0}
        steps={MOCK_STEPS}
        stepsTitle="Test Steps"
        onStepperStepClick={() => {}}
        variant="secondary"
        width={1920}
      />,
    )

    cy.get(MODAL).should('have.attr', 'style', 'min-width: 1920px; width: 100%;')

    cy.mount(
      <StepperModal
        activeStepIndex={0}
        steps={MOCKED_STEPS_WITH_WIDTH}
        stepsTitle="Test Steps"
        onStepperStepClick={() => {}}
        variant="secondary"
        width={1920}
      />,
    )

    cy.get(MODAL).should('have.attr', 'style', 'min-width: 1440px; width: 75%;')

    cy.mount(
      <StepperModal
        activeStepIndex={1}
        steps={MOCKED_STEPS_WITH_WIDTH}
        stepsTitle="Test Steps"
        onStepperStepClick={() => {}}
        variant="secondary"
        width={1920}
      />,
    )

    cy.get(MODAL).should('have.attr', 'style', 'min-width: 1632px; width: 85%;')
  })
})
