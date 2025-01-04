import { TimeUnitsModal } from './TimeUnitsModal'

const CANCEL_BUTTON = 'button[aria-label="cancel"]'
const CONFIRM_BUTTON = 'button[aria-label="confirm"]'
const TIME_UNITS_INPUT = 'input[type="number"]'
const OVERWRITE_CHECKBOX = 'input[type="checkbox"]'

describe('TimeUnitsModal', () => {
  let handleCancelClick
  let handleSaveClick

  beforeEach(() => {
    handleCancelClick = cy.spy().as('handleCancelClick')
    handleSaveClick = cy.spy().as('handleSaveClick')

    cy.mount(<TimeUnitsModal onCancelClick={handleCancelClick} onSaveClick={handleSaveClick} isVisible={true} />)
  })

  it('renders correctly', () => {
    cy.get(TIME_UNITS_INPUT).should('exist').and('be.visible')
    cy.get(TIME_UNITS_INPUT).should('have.value', '0')
    cy.get(OVERWRITE_CHECKBOX).should('exist').and('not.be.checked')
    cy.get(CANCEL_BUTTON).should('exist').and('be.visible')
    cy.get(CONFIRM_BUTTON).should('exist').and('be.visible')
  })

  it('updates timeUnits when input value changes', () => {
    cy.get(TIME_UNITS_INPUT).type('10')
    cy.get(TIME_UNITS_INPUT).should('have.value', '10')
  })

  it('updates `shouldOverwriteAll` when checkbox is toggled', () => {
    cy.get(OVERWRITE_CHECKBOX).check()
    cy.get(OVERWRITE_CHECKBOX).should('be.checked')

    cy.get(OVERWRITE_CHECKBOX).uncheck()
    cy.get(OVERWRITE_CHECKBOX).should('not.be.checked')
  })

  it('calls `onCancelClick` when the cancel button is clicked', () => {
    cy.get(CANCEL_BUTTON).click()
    cy.get('@handleCancelClick').should('have.been.calledOnce')
  })

  it('calls `onSaveClick` with correct values when the confirm button is clicked', () => {
    cy.get(TIME_UNITS_INPUT).type('5')
    cy.get(OVERWRITE_CHECKBOX).check()

    cy.get(CONFIRM_BUTTON).click()

    cy.get('@handleSaveClick').should('have.been.calledOnce')
    cy.get('@handleSaveClick').should('have.been.calledWith', 5, true)
  })
})
