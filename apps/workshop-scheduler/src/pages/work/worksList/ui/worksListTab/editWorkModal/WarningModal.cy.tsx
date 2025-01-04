import { WarningModal } from './WarningModal'

const BRAND_NAMES = ['Opel', 'Nissan', 'Toyota']
const TITLE = 'Warning'
const DESCRIPTION = 'You added new brand to the service'
const QUESTION = 'Would you like to assign locations to that service connected with brand?'

const CANCEL_BUTTON = 'button[aria-label="cancel"]'
const SKIP_AND_SAVE_BUTTON = 'button[aria-label="skip and save"]'
const ASSIGN_LOCATIONS_BUTTON = 'button[aria-label="assign locations"]'

describe('WarningModal', () => {
  beforeEach(() => {
    cy.mount(
      <WarningModal
        brandNames={BRAND_NAMES}
        isVisible={true}
        onCancel={cy.stub().as('onCancel')}
        onAssignLocations={cy.stub().as('onAssignLocations')}
        onSkipAndSave={cy.stub().as('onSkipAndSave')}
      />,
    )
  })

  it('renders the modal with correct content', () => {
    cy.contains(TITLE).should('be.visible')

    cy.contains(DESCRIPTION).should('be.visible')

    BRAND_NAMES.forEach((brandName) => {
      cy.contains(brandName).should('be.visible')
    })

    cy.contains(QUESTION).should('be.visible')

    cy.get(CANCEL_BUTTON).should('be.visible')
    cy.get(SKIP_AND_SAVE_BUTTON).should('be.visible')
    cy.get(ASSIGN_LOCATIONS_BUTTON).should('be.visible')
  })

  it('calls onCancel when the Cancel button is clicked', () => {
    cy.get(CANCEL_BUTTON).click()
    cy.get('@onCancel').should('have.been.calledOnce')
  })

  it('calls onSkipAndSave when the Skip and Save button is clicked', () => {
    cy.get(SKIP_AND_SAVE_BUTTON).click()
    cy.get('@onSkipAndSave').should('have.been.calledOnce')
  })

  it('calls onAssignLocations when the Assign Locations button is clicked', () => {
    cy.get(ASSIGN_LOCATIONS_BUTTON).click()
    cy.get('@onAssignLocations').should('have.been.calledOnce')
  })

  it('does not render the modal when isVisible is false', () => {
    cy.mount(
      <WarningModal
        brandNames={BRAND_NAMES}
        isVisible={false}
        onCancel={cy.stub()}
        onAssignLocations={cy.stub()}
        onSkipAndSave={cy.stub()}
      />,
    )

    cy.contains(TITLE).should('not.exist')
  })
})
