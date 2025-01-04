import { Footer } from './Footer'

const CANCEL_BUTTON = 'button[aria-label="Cancel"]'
const SKIP_AND_SAVE_BUTTON = 'button[aria-label="Skip & save"]'
const NEXT_BUTTON = 'button[aria-label="Next"]'

describe('Footer', () => {
  let handleCancel
  let handleNext
  let handleSkipAndSave

  beforeEach(() => {
    handleCancel = cy.spy().as('handleCancel')
    handleNext = cy.spy().as('handleNext')
    handleSkipAndSave = cy.spy().as('handleSkipAndSave')

    cy.mount(
      <Footer onCancel={handleCancel} onNext={handleNext} onSkipAndSave={handleSkipAndSave} isUpdating={false} />,
    )
  })

  it('renders all buttons correctly', () => {
    cy.get(CANCEL_BUTTON).should('exist').and('be.visible')
    cy.get(CANCEL_BUTTON).should('not.be.disabled')

    cy.get(SKIP_AND_SAVE_BUTTON).should('exist').and('be.visible')
    cy.get(SKIP_AND_SAVE_BUTTON).should('not.be.disabled')

    cy.get(NEXT_BUTTON).should('exist').and('be.visible')
    cy.get(NEXT_BUTTON).should('not.be.disabled')
  })

  it('disables buttons when `isUpdating` is true', () => {
    cy.mount(<Footer onCancel={() => {}} onNext={() => {}} onSkipAndSave={() => {}} isUpdating={true} />)

    cy.get(CANCEL_BUTTON).should('be.disabled')
    cy.get(SKIP_AND_SAVE_BUTTON).should('be.disabled')
    cy.get(NEXT_BUTTON).should('be.disabled')
  })

  it('calls `onCancel` when the cancel button is clicked', () => {
    cy.get(CANCEL_BUTTON).click()
    cy.get('@handleCancel').should('have.been.calledOnce')
  })

  it('calls `onNext` when the next button is clicked', () => {
    cy.get(NEXT_BUTTON).click()
    cy.get('@handleNext').should('have.been.calledOnce')
  })

  it('calls `onSkipAndSave` when the skip and save button is clicked', () => {
    cy.get(SKIP_AND_SAVE_BUTTON).click()
    cy.get('@handleSkipAndSave').should('have.been.calledOnce')
  })
})
