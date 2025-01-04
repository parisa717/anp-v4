import { GET_TEAM_CAPACITY } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { OverlayPanelPreview } from './OverlayPanelPreview'

const teamCapacity = GET_TEAM_CAPACITY.getTeamCapacity.teamCapacity

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

  it('does not render team capacity overlay panel when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetTeamCapacity')) {
        aliasQuery(req, 'GetTeamCapacity')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<OverlayPanelPreview onClose={() => {}} onEdit={() => {}} id="" startDate={new Date()} />)
    cy.wait('@gqlGetTeamCapacityQuery')

    cy.contains('Error occured!').should('be.visible')
  })
})
