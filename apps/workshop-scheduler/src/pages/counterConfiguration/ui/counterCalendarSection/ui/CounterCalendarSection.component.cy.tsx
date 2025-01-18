import { GET_COUNTER_CALENDAR_WORKING_DAYS } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { dayNumberToDayNameSchemaMapper } from '../../../model/formSchema'
import { CounterCalendarSection } from './CounterCalendarSection'

describe('CounterCalendarSection', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounterCalendar')) {
        aliasQuery(req, 'GetLocationCounterCalendar')
        successResponse(req, GET_COUNTER_CALENDAR_WORKING_DAYS)
      }
    })

    cy.mountWithProviders(<CounterCalendarSection />)
    cy.wait('@gqlGetLocationCounterCalendarQuery')
  })

  it('should render empty message when counter calendar setup is empty', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounterCalendar')) {
        aliasQuery(req, 'GetLocationCounterCalendar')
        successResponse(req, {
          getLocationCounterCalendar: {
            workDays: [],
          },
        })
      }
    })

    cy.mountWithProviders(<CounterCalendarSection />)
    cy.wait('@gqlGetLocationCounterCalendarQuery')

    cy.contains('Counter calendar configuration is not set!').should('be.visible')
  })

  it('should render every day of the week correctly', () => {
    GET_COUNTER_CALENDAR_WORKING_DAYS.getLocationCounterCalendar.workDays?.forEach((workDay, index) => {
      cy.get('[data-pc-section="bodyrow"]')
        .eq(index)
        .find('[data-pc-section="bodycell"]')
        .eq(0)
        .should('contain.text', dayNumberToDayNameSchemaMapper[workDay.dayNumber])

      cy.get('[data-pc-section="bodyrow"]')
        .eq(index)
        .find('[data-pc-section="bodycell"]')
        .eq(1)
        .should('contain.text', `${workDay.startTime} - ${workDay.endTime}`)

      if (workDay.breaks.length) {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(2)
          .each((breakRow, breakRowIndex) => {
            cy.wrap(breakRow)
              .get('div')
              .should(
                'contain.text',
                `${workDay.breaks[breakRowIndex].startTime} - ${workDay.breaks[breakRowIndex].endTime}`,
              )
          })
      } else {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(2)
          .each((breakRow) => {
            cy.wrap(breakRow).should('contain.text', '―')
          })
      }
    })
  })
})
