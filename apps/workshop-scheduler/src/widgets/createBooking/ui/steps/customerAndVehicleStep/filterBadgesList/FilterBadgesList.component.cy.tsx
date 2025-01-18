import { Filter } from '../filterBadge/FilterBadge'
import { FilterBadgesList } from './FilterBadgesList'

const filters: Filter[] = [
  {
    label: 'customerName',
    value: 'Name',
  },
  {
    label: 'customerPhone',
    value: 'Phone',
  },
]

describe('FilterBadgesList component', () => {
  beforeEach(() => {
    const onFilterRemoveClickSpy = cy.spy().as('onFilterRemoveClickSpy')
    const onFiltersClearClickSpy = cy.spy().as('onFiltersClearClickSpy')

    cy.mountWithProviders(
      <FilterBadgesList
        filters={filters}
        onFiltersClear={onFiltersClearClickSpy}
        onFilterRemove={onFilterRemoveClickSpy}
      />,
    )
  })

  it('should render correctly', () => {
    cy.contains('Searching criteria').should('be.visible')
    cy.contains('Clear').should('be.visible')
    cy.contains('Customer: Name').should('be.visible')
    cy.contains('Mobile phone: Phone').should('be.visible')
  })

  it('should trigger clear action after clicking CLEAR button', () => {
    cy.contains('Clear').click()
    cy.get('@onFiltersClearClickSpy').should('have.been.called')
  })

  it('should trigger remove filter action after clicking X button on the badge', () => {
    cy.contains('Mobile phone').parent().find('[data-pc-section="removeicon"]').click()
    cy.get('@onFilterRemoveClickSpy').should('have.been.called')
  })
})
