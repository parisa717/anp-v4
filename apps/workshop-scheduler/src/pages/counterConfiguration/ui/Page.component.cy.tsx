import {
  GET_COUNTER_CALENDAR_WORKING_DAYS,
  GET_COUNTER_RECEPTION_INTERVAL,
  GET_LOCATION_COUNTER_CALENDAR_SERVER_SIDE_ERROR_RESPONSE,
  GET_LOCATION_COUNTER_SERVER_SIDE_ERROR_RESPONSE,
  UPDATE_LOCATION_COUNTER_CALENDAR_SERVER_SIDE_ERROR_RESPONSE,
  UPDATE_LOCATION_COUNTER_RECEPTION_INTERVAL_SERVER_SIDE_ERROR_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import CounterConfigurationPage from './Page'

describe('CounterConfigurationPage', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<CounterConfigurationPage />)

    cy.contains('Counter Configuration')
  })

  it('displays feature-specific server-side error on fetch location counter calendar', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounterCalendar')) {
        aliasQuery(req, 'GetLocationCounterCalendar')
        errorResponse(req, GET_LOCATION_COUNTER_CALENDAR_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<CounterConfigurationPage />, {
      initialRouteEntries: ['/counter-configurator'],
      route: '/counter-configurator',
    })

    cy.wait('@gqlGetLocationCounterCalendarQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Counter not found.')
  })

  it('displays feature-specific server-side error on fetch location counter', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounter')) {
        aliasQuery(req, 'GetLocationCounter')
        errorResponse(req, GET_LOCATION_COUNTER_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<CounterConfigurationPage />, {
      initialRouteEntries: ['/counter-configurator'],
      route: '/counter-configurator',
    })

    cy.wait('@gqlGetLocationCounterQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location not found.')
  })

  it('displays feature-specific server-side error on update location counter calendar', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounterCalendar')) {
        aliasQuery(req, 'GetLocationCounterCalendar')
        successResponse(req, GET_COUNTER_CALENDAR_WORKING_DAYS)
      }
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationCounterCalendar')) {
        aliasMutation(req, 'UpdateLocationCounterCalendar')
        errorResponse(req, UPDATE_LOCATION_COUNTER_CALENDAR_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<CounterConfigurationPage />, {
      initialRouteEntries: ['/counter-configurator'],
      route: '/counter-configurator',
    })

    cy.wait('@gqlGetLocationCounterCalendarQuery')

    cy.contains('edit').click()
    cy.get('form').submit()

    cy.wait('@gqlUpdateLocationCounterCalendarMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Counter not found.')
  })

  it('displays feature-specific server-side error on update location counter reception interval', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationCounter')) {
        aliasQuery(req, 'GetLocationCounter')
        successResponse(req, GET_COUNTER_RECEPTION_INTERVAL)
      }
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationCounterReceptionInterval')) {
        aliasMutation(req, 'UpdateLocationCounterReceptionInterval')
        errorResponse(req, UPDATE_LOCATION_COUNTER_RECEPTION_INTERVAL_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<CounterConfigurationPage />, {
      initialRouteEntries: ['/counter-configurator'],
      route: '/counter-configurator',
    })

    cy.wait('@gqlGetLocationCounterQuery')

    cy.get('button').eq(1).click()
    cy.contains('save').click()

    cy.wait('@gqlUpdateLocationCounterReceptionIntervalMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location not found.')
  })
})
