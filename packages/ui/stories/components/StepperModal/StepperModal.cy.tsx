import { StepperModal } from './StepperModal'

const MODAL = '[data-pc-section="root"]'
const STEPS = '[data-pc-section="menu"]'
const STEP_CONTENT = '[data-cy="step-content"]'
const STEP_MENU_ITEM = '[data-pc-section="menuitem"]'
const STEP_ITEM = '[data-pc-section="step"]'

const MOCK_STEPS = [
  { label: 'Step 1', content: <div>Content for Step 1</div>, width: 600 },
  { label: 'Step 2', content: <div>Content for Step 2</div>, width: 600 },
  { label: 'Step 3', content: <div>Content for Step 3</div>, width: 600 },
]

describe('StepperModal', () => {
  let onStepperStepClick

  beforeEach(() => {
    onStepperStepClick = cy.spy().as('onStepperStepClick')

    cy.mount(
      <StepperModal
        activeStepIndex={0}
        steps={MOCK_STEPS}
        stepsTitle="Test Steps"
        onStepperStepClick={onStepperStepClick}
        minWidth={1000}
      />,
    )
  })

  it('renders the modal and displays the title and initial step content', () => {
    cy.get(MODAL).should('exist')
    cy.contains('Test Steps').should('be.visible')
    cy.get(STEP_CONTENT).should('contain.text', 'Content for Step 1')
  })

  it('calls onStepChange when a step is selected', () => {
    cy.get(STEPS).find(STEP_ITEM).eq(1).click()
    cy.get('@onStepperStepClick').should('have.been.calledWith', 1)
  })

  it('displays active step correctly', () => {
    cy.get(STEPS).find(STEP_MENU_ITEM).eq(0).should('have.class', 'p-steps-current')
    cy.get(STEPS).find(STEP_MENU_ITEM).eq(1).should('not.have.class', 'p-steps-current')
    cy.get(STEPS).find(STEP_MENU_ITEM).eq(2).should('not.have.class', 'p-steps-current')
  })
})
