import { LocationOverbookingEditForm } from './LocationOverbookingEditForm'

const MIN_CAPACITY_OVERBOOKING = 100
const MAX_CAPACITY_OVERBOOKING = 200
const CAPACITY_OVERBOOKING = 120

describe('LocationOverbookingEditForm component', () => {
  beforeEach(() => {
    const onCancelClickSpy = cy.spy().as('onCancelClickSpy')
    const onSubmitClickSpy = cy.spy().as('onSubmitClickSpy')

    cy.mountWithProviders(
      <LocationOverbookingEditForm
        minValue={MIN_CAPACITY_OVERBOOKING}
        maxValue={MAX_CAPACITY_OVERBOOKING}
        defaultValue={CAPACITY_OVERBOOKING}
        onCancel={onCancelClickSpy}
        onSubmit={onSubmitClickSpy}
      />,
    )
  })

  it('should render correctly', () => {
    cy.get('[data-cy="min-capacity-overbooking"]').should('contain.text', MIN_CAPACITY_OVERBOOKING)
    cy.get('[data-cy="max-capacity-overbooking"]').should('contain.text', MAX_CAPACITY_OVERBOOKING)
  })

  it('should trigger onCancel callback when CANCEL button is clicked', () => {
    cy.get('[data-cy="cancel-button"]').click()
    cy.get('@onCancelClickSpy').should('have.been.called')
  })

  it('should trigger onSubmit callback when form is submitted with valid values', () => {
    cy.get('form').submit()
    cy.get('@onSubmitClickSpy').should('have.been.called')
  })

  it('should not trigger onSubmit callback when form is submitted with invalid values', () => {
    cy.get('input').type('0')
    cy.get('form').submit()

    cy.get('@onSubmitClickSpy').should('not.have.been.called')
    cy.contains(`Number must be less than or equal to ${MAX_CAPACITY_OVERBOOKING}`).should('be.visible')
  })
})
