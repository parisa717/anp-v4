import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

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
const DROPDOWNACTIVE = '[data-cy="datatable-dropdown"]'

const sortTable = (colIndex: number, base: string[], sorted: string[]) => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get(ROW).first().find(CELL).eq(colIndex).should('contain.text', firstBase)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('contain.text', lastBase)

  // Ascending
  cy.get(SORT).eq(colIndex).click()

  cy.get(ROW).first().find(CELL).eq(colIndex).should('contain.text', firstSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('contain.text', lastSorted)

  // Descending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('contain.text', lastSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('contain.text', firstSorted)

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
const filterTableByDropdownActive = (
  colIndex: number,
  query: string,
  lengthBeforeQuery: number,
  lengthAfterQuery: number,
) => {
  const CLEAR = '[data-pc-section="clearicon"]'
  const ITEM = '[data-pc-section="item"]'

  cy.get(ROW).should('have.length', lengthBeforeQuery)

  cy.get(DROPDOWNACTIVE).eq(colIndex).realClick()
  cy.get(ITEM).contains(query, { matchCase: false }).realClick()
  cy.get(ROW).should('have.length', lengthAfterQuery)

  cy.get(DROPDOWNACTIVE).find(CLEAR).realClick()
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

  it.skip('renders the table with locations', () => {
    const getLocationFields = (location: LocationEntity) => [
      location.area.id,
      location.code,
      location.name,
      location.brands.map((b) => b.code).join(''),
      location.address.postCode,
      location.address.city,
      location.address.address,
      location.address.country.name,
      location.isActive ? 'active' : 'inactive',
    ]

    LOCATIONS?.forEach((location, locationIndex) => {
      getLocationFields(location).forEach((field, fieldIndex) => {
        console.log(field)
        cy.get(ROW).eq(locationIndex).find(CELL).eq(fieldIndex).should('contain.text', field)
      })
    })
  })

  it.skip('sorts the table on sortable fields', () => {
    sortTable(
      0,
      [LOCATIONS[0].area.id, LOCATIONS[LOCATIONS.length - 1].area.id],
      [LOCATIONS[0].area.id, LOCATIONS[LOCATIONS.length - 1].area.id],
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
    sortTable(
      7,
      [LOCATIONS[0].address.country.name, LOCATIONS[LOCATIONS.length - 1].address.country.name],
      [LOCATIONS[2].address.country.name, LOCATIONS[0].address.country.name],
    )
    sortTable(8, ['inactive', 'active'], ['inactive', 'active'])
  })

  // Add new test for filtering
  it.skip('filters the table on all fields', () => {
    filterTableBySearch(0, LOCATIONS[0].area.id, LOCATIONS.length, 1)
    filterTableBySearch(1, LOCATIONS[0].code, LOCATIONS.length, 1)
    filterTableBySearch(2, LOCATIONS[0].name, LOCATIONS.length, 1)
    filterTableByDropdown(0, BRANDS[1].code, LOCATIONS.length, 1)
    filterTableBySearch(3, LOCATIONS[0].address.postCode, LOCATIONS.length, 1)
    filterTableBySearch(4, LOCATIONS[0].address.city, LOCATIONS.length, 1)
    filterTableBySearch(5, LOCATIONS[0].address.address, LOCATIONS.length, 1)
    filterTableBySearch(6, LOCATIONS[0].address.country.name, LOCATIONS.length, 4)
    filterTableByDropdownActive(0, 'Active', LOCATIONS.length, 3)
  })

  it.skip('renders empty message when locations array is empty', () => {
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

  it.skip('does not render table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<LocationsListPage />)
    cy.wait('@gqlGetLocationsQuery')

    cy.contains('Error').should('be.visible')
  })
})
