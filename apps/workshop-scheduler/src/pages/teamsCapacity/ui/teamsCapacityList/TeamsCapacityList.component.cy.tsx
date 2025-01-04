import { LocationTeamsCalendarDayCapacity } from '@/entities/teamsCapacity'

import { TeamsCapacityList } from './TeamsCapacityList'

const capacities: LocationTeamsCalendarDayCapacity[] = [
  {
    teamId: '1',
    qualificationName: 'Name1',
    capacity: 100,
  },
  {
    teamId: '2',
    qualificationName: 'Name2',
    capacity: 200,
  },
]

describe('TeamsCapacityList component', () => {
  beforeEach(() => {
    cy.mountWithProviders(<TeamsCapacityList capacities={capacities} startDate={new Date()} />)
  })

  it('should render correctly', () => {
    capacities.forEach((capacity) => {
      cy.contains(`${capacity.capacity} TU`).should('be.visible')
      cy.contains(capacity.qualificationName).should('be.visible')
    })
  })

  it('should open a dialog on double clicking a list item', () => {
    cy.get('[data-cy="team-capacity-list-item"]').dblclick({ force: true })
    cy.get('[data-pc-name="overlaypanel"]').should('be.visible')
  })
})
