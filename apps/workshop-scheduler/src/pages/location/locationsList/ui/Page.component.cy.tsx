import {
  CREATE_CONNECTED_LOCATION_SERVER_SIDE_ERROR_RESPONSE,
  GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
  GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasQuery, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { LocationEntity } from '@/entities/location'

import LocationsListPage from './Page'

const LOCATIONS = GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations
const BRANDS = GET_BRANDS_OPERATION_DEFAULT_RESPONSE.getBrands.brands

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'
const SORT = '[data-pc-section="sort"]'
// Add new selectors
const FILTER = '[data-cy="search-input"]'
const DROPDOWN = '[data-pc-name="multiselect"]'

const sortTable = (colIndex: number, base: string[], sorted: string[]) => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstBase)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastBase)

  // Ascending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastSorted)

  // Descending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', lastSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', firstSorted)

  // Back to default
  cy.get(SORT).eq(colIndex).click()
}

// Add filtering helper functions
const filterTableBySearch = (colIndex: number, query: string, lengthBeforeQuery: number, lengthAfterQuery: number) => {
  cy.get(ROW).should('have.length', lengthBeforeQuery)

  cy.get(FILTER).eq(colIndex).focus().realType(query)
  cy.get(ROW).should('have.length', lengthAfterQuery)

  cy.get(FILTER).eq(colIndex).focus().clear()
  cy.get(ROW).should('have.length', lengthBeforeQuery)
}

const filterTableByDropdown = (
  colIndex: number,
  query: string,
  lengthBeforeQuery: number,
  lengthAfterQuery: number,
) => {
  const CLEAR = '[data-pc-section="clearicon"]'
  const ITEM = '[data-pc-section="item"]'

  cy.get(ROW).should('have.length', lengthBeforeQuery)

  cy.get(DROPDOWN).eq(colIndex).realClick()
  cy.get(ITEM).contains(query, { matchCase: false }).realClick()
  cy.get(ROW).should('have.length', lengthAfterQuery)

  cy.get(DROPDOWN).find(CLEAR).realClick()
  cy.get(ROW).should('have.length', lengthBeforeQuery)
}

describe('LocationsListPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE)
      }
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationsListPage />)
    cy.wait('@gqlGetLocationsQuery')
    cy.wait('@gqlGetBrandsQuery')
  })

  it('renders the table with locations', () => {
    const getLocationFields = (location: LocationEntity) => [
      location.area.code,
      location.code,
      location.name,
      location.brands.map((b) => b.code).join(''),
      location.address.postCode,
      location.address.city,
      location.address.address,
    ]

    LOCATIONS?.forEach((location, locationIndex) => {
      getLocationFields(location).forEach((field, fieldIndex) => {
        cy.get(ROW).eq(locationIndex).find(CELL).eq(fieldIndex).should('contain.text', field)
      })
    })
  })

  it('sorts the table on sortable fields', () => {
    sortTable(
      0,
      [LOCATIONS[0].area.code, LOCATIONS[LOCATIONS.length - 1].area.code],
      [LOCATIONS[0].area.code, LOCATIONS[LOCATIONS.length - 1].area.code],
    )
    sortTable(
      1,
      [LOCATIONS[0].code, LOCATIONS[LOCATIONS.length - 1].code],
      [LOCATIONS[0].code, LOCATIONS[LOCATIONS.length - 1].code],
    )
    sortTable(
      2,
      [LOCATIONS[0].name, LOCATIONS[LOCATIONS.length - 1].name],
      [LOCATIONS[0].name, LOCATIONS[LOCATIONS.length - 1].name],
    )
    sortTable(
      3,
      [
        LOCATIONS[0].brands.map((b) => b.code).join(''),
        LOCATIONS[LOCATIONS.length - 1].brands.map((b) => b.code).join(''),
      ],
      [
        LOCATIONS[LOCATIONS.length - 1].brands.map((b) => b.code).join(''),
        LOCATIONS[0].brands.map((b) => b.code).join(''),
      ],
    )
    sortTable(
      4,
      [LOCATIONS[0].address.postCode, LOCATIONS[LOCATIONS.length - 1].address.postCode],
      [LOCATIONS[LOCATIONS.length - 1].address.postCode, LOCATIONS[0].address.postCode],
    )
    sortTable(
      5,
      [LOCATIONS[0].address.city, LOCATIONS[LOCATIONS.length - 1].address.city],
      [LOCATIONS[1].address.city, LOCATIONS[2].address.city],
    )
    sortTable(
      6,
      [LOCATIONS[0].address.address, LOCATIONS[LOCATIONS.length - 1].address.address],
      [LOCATIONS[2].address.address, LOCATIONS[0].address.address],
    )
  })

  // Add new test for filtering
  it('filters the table on all fields', () => {
    cy.mountWithProviders(<LocationsListPage />)
    cy.wait('@gqlGetLocationsQuery')

    filterTableBySearch(0, LOCATIONS[0].area.code, LOCATIONS.length, 1)
    filterTableBySearch(1, LOCATIONS[0].code, LOCATIONS.length, 1)
    filterTableBySearch(2, LOCATIONS[0].name, LOCATIONS.length, 1)
    filterTableByDropdown(0, BRANDS[1].code, LOCATIONS.length, 1)
    filterTableBySearch(3, LOCATIONS[0].address.postCode, LOCATIONS.length, 1)
    filterTableBySearch(4, LOCATIONS[0].address.city, LOCATIONS.length, 1)
    filterTableBySearch(5, LOCATIONS[0].address.address, LOCATIONS.length, 1)
  })

  it('renders empty message when locations array is empty', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, {
          getLocations: {
            locations: [],
          },
        })
      }
    })

    cy.mountWithProviders(<LocationsListPage />)
    cy.wait('@gqlGetLocationsQuery')

    cy.contains('No locations found').should('be.visible')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        errorResponse(req, CREATE_CONNECTED_LOCATION_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationsListPage />, {
      initialRouteEntries: ['/location'],
      route: '/location',
    })
    cy.wait('@gqlGetLocationsQuery')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location already exists.')
  })
})
