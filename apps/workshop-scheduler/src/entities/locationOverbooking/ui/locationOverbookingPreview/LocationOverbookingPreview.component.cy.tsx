import { LocationOverbookingPreview } from './LocationOverbookingPreview'

const MIN_CAPACITY_OVERBOOKING = 100
const MAX_CAPACITY_OVERBOOKING = 200
const CAPACITY_OVERBOOKING = 120

describe('LocationOverbookingPreview component', () => {
  beforeEach(() => {
    const onEditClickSpy = cy.spy().as('onEditClickSpy')

    cy.mountWithProviders(
      <LocationOverbookingPreview
        onEdit={onEditClickSpy}
        minValue={MIN_CAPACITY_OVERBOOKING}
        maxValue={MAX_CAPACITY_OVERBOOKING}
        value={CAPACITY_OVERBOOKING}
      />,
    )
  })

  it('should render the correct content', () => {
    cy.get('[data-cy="capacity-overbooking"]').should('contain.text', CAPACITY_OVERBOOKING)
    cy.get('[data-cy="min-capacity-overbooking"]').should('contain.text', MIN_CAPACITY_OVERBOOKING)
    cy.get('[data-cy="max-capacity-overbooking"]').should('contain.text', MAX_CAPACITY_OVERBOOKING)
  })

  it('should trigger onEdit callback when EDIT button is clicked', () => {
    cy.get('[data-pc-name="button"]').click()
    cy.get('@onEditClickSpy').should('have.been.called')
  })
})
