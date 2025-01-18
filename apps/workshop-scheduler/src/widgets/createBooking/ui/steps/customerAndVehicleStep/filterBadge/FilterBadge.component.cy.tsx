import { Filter, FilterBadge } from './FilterBadge'

const filter: Filter = {
  label: 'customerName',
  value: 'Name',
}

describe('FilterBadge component', () => {
  beforeEach(() => {
    const onRemoveClickSpy = cy.spy().as('onRemoveClickSpy')

    cy.mountWithProviders(<FilterBadge filter={filter} onRemove={onRemoveClickSpy} />)
  })

  it('should render correctly', () => {
    cy.contains('Customer: Name').should('be.visible')
  })

  it('should trigger remove action after clicking X button', () => {
    cy.get('[data-pc-section="removeicon"]').click()
    cy.get('@onRemoveClickSpy').should('have.been.called')
  })
})
