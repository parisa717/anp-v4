import {
  GET_LOCATION_TEAMS_CALENDAR_SERVER_SIDE_ERROR_RESPONSE,
  GET_QUALIFICATIONS_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasQuery, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import TeamsCapacityPage from './Page'

describe('TeamsCapacityPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        aliasQuery(req, 'GetQualifications')
        successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
      }
    })
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationTeamsCalendar')) {
        aliasQuery(req, 'GetLocationTeamsCalendar')
        errorResponse(req, GET_LOCATION_TEAMS_CALENDAR_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<TeamsCapacityPage />, {
      initialRouteEntries: ['/teams-capacity'],
      route: '/teams-capacity',
    })

    cy.wait('@gqlGetQualificationsQuery')
    cy.wait('@gqlGetLocationTeamsCalendarQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location not found.')
  })
})
