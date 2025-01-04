import { GET_SERVICE_ADVISOR_CALENDAR_DEFAULT_RESPONSE, GET_SERVICE_ADVISOR_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { CalendarEntryType } from '@/shared/api/types.generated'

import LocationServiceAdvisorDetailsPage from './Page'

const LOCATION_WORK_ID = '1'
describe('LocationServiceAdvisorDetailsPage', () => {
  describe('side bar', () => {
    beforeEach(() => {
      cy.mountWithProviders(<LocationServiceAdvisorDetailsPage />, {
        initialRouteEntries: [`/service-advisor/${LOCATION_WORK_ID}`],
        route: '/service-advisor/:id',
      })
    })
    it('displays data correctly when success request', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetServiceAdvisor')) {
          aliasQuery(req, 'GetServiceAdvisor')
          successResponse(req, GET_SERVICE_ADVISOR_DEFAULT_RESPONSE)
        }
        if (hasOperationName(req, 'GetServiceAdvisorCalendar')) {
          aliasQuery(req, 'GetServiceAdvisorCalendar')
          successResponse(req, GET_SERVICE_ADVISOR_CALENDAR_DEFAULT_RESPONSE)
        }
      })

      cy.wait('@gqlGetServiceAdvisorQuery')
      cy.wait('@gqlGetServiceAdvisorCalendarQuery')

      const data = GET_SERVICE_ADVISOR_DEFAULT_RESPONSE.getServiceAdvisor
      ;[data.name, data.number, data.receptionInterval, data.surname].forEach((value) => {
        cy.contains(value).should('exist')
      })
      const calendarData = GET_SERVICE_ADVISOR_CALENDAR_DEFAULT_RESPONSE.getServiceAdvisorCalendar
      const bufferAppointments = calendarData.calendar.entries.filter((x) => x.type === CalendarEntryType.AdvisorBuffer)
      cy.contains('p', 'Buffer appointments').siblings().should('have.length', bufferAppointments.length)
    })

    it('shows error message when GQL query errors', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetServiceAdvisor')) {
          aliasQuery(req, 'GetServiceAdvisor')
          errorResponse(req, {
            message: 'User not authenticated',
            path: ['currentUser'],
            extensions: { code: 'UNAUTHENTICATED' },
          })
        }
        cy.wait('@gqlGetServiceAdvisorQuery')

        cy.contains('Error').should('be.visible')
      })
    })
  })
})
