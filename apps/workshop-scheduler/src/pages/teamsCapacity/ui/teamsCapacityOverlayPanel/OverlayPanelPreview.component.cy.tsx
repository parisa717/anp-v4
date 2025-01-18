import { GET_TEAM_CAPACITY, GET_TEAM_CAPACITY_SERVER_SIDE_ERROR_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { OverlayPanelPreview } from './OverlayPanelPreview'

const teamCapacity = GET_TEAM_CAPACITY.getTeamCapacity

describe('OverlayPanelPreview component', () => {
  beforeEach(() => {
    const onEditClickSpy = cy.spy().as('onEditClickSpy')
    const onCloseClickSpy = cy.spy().as('onCloseClickSpy')

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetTeamCapacity')) {
        aliasQuery(req, 'GetTeamCapacity')
        successResponse(req, GET_TEAM_CAPACITY)
      }
    })

    cy.mountWithProviders(
      <OverlayPanelPreview onClose={onCloseClickSpy} onEdit={onEditClickSpy} id="" startDate={new Date()} />,
    )
    cy.wait('@gqlGetTeamCapacityQuery')
  })

  it('should render the content correctly', () => {
    cy.contains('edit').should('be.visible')
    cy.contains(teamCapacity.capacity).should('be.visible')
    cy.contains(teamCapacity.qualificationName).should('be.visible')
  })

  it('should trigger onEdit callback when EDIT button is clicked', () => {
    cy.contains('edit').click()
    cy.get('@onEditClickSpy').should('have.been.called')
  })

  it('should trigger onClose callback when X icon is clicked', () => {
    cy.get('[data-cy="close-icon"]').click()
    cy.get('@onCloseClickSpy').should('have.been.called')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetTeamCapacity')) {
        aliasQuery(req, 'GetTeamCapacity')
        errorResponse(req, GET_TEAM_CAPACITY_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<OverlayPanelPreview onClose={cy.stub} onEdit={cy.stub} id="" startDate={new Date()} />, {
      initialRouteEntries: ['/teams-capacity'],
      route: '/teams-capacity',
    })
    cy.wait('@gqlGetTeamCapacityQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Team not found.')
  })
})
