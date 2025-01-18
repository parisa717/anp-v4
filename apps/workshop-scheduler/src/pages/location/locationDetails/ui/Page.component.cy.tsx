import {
  CREATE_AREA_SERVER_SIDE_ERROR_RESPONSE,
  CREATE_CONNECTED_LOCATION_SERVER_SIDE_ERROR_RESPONSE,
  GET_AREA_OPERATION_DEFAULT_RESPONSE,
  GET_LOCATION_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasQuery, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { AreaEntity } from '@/entities/area'
import { LocationEntity } from '@/entities/location'

import LocationDetailsPage from './Page'

const AREA_TABLE = '[data-cy="area-table"]'
const LOCATION_TABLE = '[data-cy="location-table"]'
const CELL = '[data-pc-section="bodycell"]'

const LOCATION_DATA = GET_LOCATION_OPERATION_DEFAULT_RESPONSE.getLocation
const AREA_DATA = GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea

const verifyTableRendering = (tableSelector: string, columnsData: string[]) => {
  cy.get(tableSelector)
    .find(CELL)
    .each((cell, index) => {
      cy.wrap(cell).should('contain.text', columnsData[index])
    })
}

describe('LocationDetailsPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocation')) {
        aliasQuery(req, 'GetLocation')
        successResponse(req, GET_LOCATION_OPERATION_DEFAULT_RESPONSE)
      }
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, GET_AREA_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationDetailsPage />)
    cy.wait('@gqlGetLocationQuery')
    cy.wait('@gqlGetAreaQuery')
  })

  it('renders the area table correctly after loading location data', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocation')) {
        const getAreaFields = (area: AreaEntity) => [
          area.code,
          area.name,
          area.address.country.name,
          area.dms,
          area.crm,
          area.address.postCode,
          area.address.city,
          area.address.address,
        ]
        verifyTableRendering(AREA_TABLE, getAreaFields(AREA_DATA))
      }
    })
  })

  it('renders the location table correctly', () => {
    const getLocationFields = (location: LocationEntity) => [
      location.code,
      location.name,
      location.brands.map((b) => b.code).join(', '),
      '',
      '',
      location.address.postCode,
      location.address.city,
      location.address.address,
    ]

    verifyTableRendering(LOCATION_TABLE, getLocationFields(LOCATION_DATA))
  })

  it('renders breadcrumb items correctly', () => {
    cy.get('.p-breadcrumb')
      .find('.p-menuitem')
      .should('have.length', 2)
      .each((breadcrumbItem, index) => {
        const expectedLabels = ['Locations Configuration', 'Location Details']
        cy.wrap(breadcrumbItem).should('contain.text', expectedLabels[index])
      })
  })

  it('renders an empty message when no location data is available', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocation')) {
        aliasQuery(req, 'GetLocation')
        successResponse(req, { getLocation: null })
      }
    })

    cy.mountWithProviders(<LocationDetailsPage />)

    cy.contains('No location details found').should('be.visible')
  })

  it('renders an empty message when no area data is available', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, { getArea: null })
      }
    })

    cy.mountWithProviders(<LocationDetailsPage />)
    cy.wait('@gqlGetAreaQuery')
    cy.contains('No area details found').should('be.visible')
  })

  it('displays feature-specific server-side error for getLocation', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocation')) {
        aliasQuery(req, 'GetLocation')
        errorResponse(req, CREATE_CONNECTED_LOCATION_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationDetailsPage />, {
      initialRouteEntries: ['/location/1/details'],
      route: '/location/:id/details',
    })

    cy.wait('@gqlGetLocationQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location already exists.')
  })

  it('displays feature-specific server-side error for getArea', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        errorResponse(req, CREATE_AREA_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationDetailsPage />, {
      initialRouteEntries: ['/location/1/details'],
      route: '/location/:id/details',
    })

    cy.wait('@gqlGetAreaQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Area already exists.')
  })
})
