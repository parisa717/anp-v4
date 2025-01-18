import { LocationCounterPreview } from './LocationCounterPreview'

const COUNTER_RECEPTION_INTERVAL_VALUE = 10

describe('LocationCounterPreview component', () => {
  beforeEach(() => {
    const onEditClickSpy = cy.spy().as('onEditClickSpy')

    cy.mountWithProviders(
      <LocationCounterPreview onEdit={onEditClickSpy} counterReceptionInterval={COUNTER_RECEPTION_INTERVAL_VALUE} />,
    )
  })

  it('should render the correct content', () => {
    cy.contains('Define slots frequency').should('exist')
    cy.contains(`${COUNTER_RECEPTION_INTERVAL_VALUE} Minutes`)
    cy.contains('edit').should('exist')
  })

  it('should trigger onEdit callback when EDIT button is clicked', () => {
    cy.contains('edit').click()
    cy.get('@onEditClickSpy').should('have.been.called')
  })
})
