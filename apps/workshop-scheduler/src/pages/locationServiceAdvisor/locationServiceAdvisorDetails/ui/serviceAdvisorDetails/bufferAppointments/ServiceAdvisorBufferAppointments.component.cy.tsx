import { GET_SERVICE_ADVISOR_CALENDAR_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { ServiceAdvisorBufferAppointments } from './ServiceAdvisorBufferAppointments'

describe('ServiceAdvisorBufferAppointments', () => {
  it('opens edit buffer appointment popup', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetServiceAdvisorCalendar')) {
        aliasQuery(req, 'GetServiceAdvisorCalendar')
        successResponse(req, GET_SERVICE_ADVISOR_CALENDAR_DEFAULT_RESPONSE)
      }
    })
    cy.mountWithProviders(<ServiceAdvisorBufferAppointments currentView="month" selectedDate={new Date()} />)
    cy.get('button[aria-label="edit"]').first().click()
    cy.get('[data-pc-name="overlaypanel"]').should('exist')
    cy.get('[data-pc-name="overlaypanel"]').should('contain.text', 'Edit buffer date')
  })
})
