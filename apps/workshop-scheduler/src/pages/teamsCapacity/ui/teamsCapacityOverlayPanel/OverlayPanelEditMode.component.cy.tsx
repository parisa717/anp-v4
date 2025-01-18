import { GET_TEAM_CAPACITY, UPDATE_TEAM_CAPACITY_SERVER_SIDE_ERROR_RESPONSE } from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import { OverlayPanelEditMode } from './OverlayPanelEditMode'

const teamCapacity = GET_TEAM_CAPACITY.getTeamCapacity

const NEW_DATE = new Date()

describe('OverlayPanelEditMode component', () => {
  beforeEach(() => {
    const onCancelClickSpy = cy.spy().as('onCancelClickSpy')
    const onCloseClickSpy = cy.spy().as('onCloseClickSpy')

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetTeamCapacity')) {
        aliasQuery(req, 'GetTeamCapacity')
        successResponse(req, GET_TEAM_CAPACITY)
      }
    })

    cy.mountWithProviders(
      <OverlayPanelEditMode onClose={onCloseClickSpy} onCancel={onCancelClickSpy} id="" startDate={NEW_DATE} />,
    )
    cy.wait('@gqlGetTeamCapacityQuery')
  })

  it('should render the content correctly', () => {
    cy.contains('cancel').should('be.visible')
    cy.contains('save').should('be.visible')
    cy.contains(teamCapacity.qualificationName).should('be.visible')
  })

  it('should trigger onCancel callback when CANCEL button is clicked', () => {
    cy.contains('cancel').click()
    cy.get('@onCancelClickSpy').should('have.been.called')
  })

  it('should trigger onClose callback when X icon is clicked', () => {
    cy.get('[data-cy="close-icon"]').click()
    cy.get('@onCloseClickSpy').should('have.been.called')
  })

  it('should trigger onSave callback when form is submitted with valid value', () => {
    const CAPACITY_VALUE = '500'

    cy.get('input[name="capacity"]').clear().type(CAPACITY_VALUE)

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateTeamCapacity')) {
        aliasMutation(req, 'UpdateTeamCapacity')

        expect(req.body.variables).to.deep.equal({
          capacity: Number(CAPACITY_VALUE),
          startDate: String(NEW_DATE),
          id: '',
        })

        successResponse(req, {
          updateTeamCapacity: {
            status: true,
          },
        })
      }
    })

    cy.get('form').submit()
    cy.wait('@gqlUpdateTeamCapacityMutation')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateTeamCapacity')) {
        aliasMutation(req, 'UpdateTeamCapacity')
        errorResponse(req, UPDATE_TEAM_CAPACITY_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<OverlayPanelEditMode onClose={cy.stub} onCancel={cy.stub} id="" startDate={NEW_DATE} />, {
      initialRouteEntries: ['/teams-capacity'],
      route: '/teams-capacity',
    })

    cy.get('form').submit()

    cy.wait('@gqlUpdateTeamCapacityMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Team not found.')
  })
})
