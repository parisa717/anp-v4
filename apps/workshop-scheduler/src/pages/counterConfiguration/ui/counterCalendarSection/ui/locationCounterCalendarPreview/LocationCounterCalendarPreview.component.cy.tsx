import { LocationCounterCalendarPreview } from './LocationCounterCalendarPreview'

describe('LocationCounterCalendarPreview component', () => {
  beforeEach(() => {
    const onEditClickSpy = cy.spy().as('onEditClickSpy')

    cy.mountWithProviders(
      <LocationCounterCalendarPreview onEdit={onEditClickSpy} workDaysData={[]} isWorkDaysDataLoading={false} />,
    )
  })

  it('should render the correct content', () => {
    cy.get('[data-pc-section="table"]').should('exist')
    cy.contains('edit').should('exist')
  })

  it('should trigger onEdit callback when EDIT button is clicked', () => {
    cy.contains('edit').click()
    cy.get('@onEditClickSpy').should('have.been.called')
  })
})
