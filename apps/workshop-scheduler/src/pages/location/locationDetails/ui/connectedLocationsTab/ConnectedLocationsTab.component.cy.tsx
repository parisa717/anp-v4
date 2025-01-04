import {
  GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
  GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE,
  GET_WORKSHOP_CONNECTED_LOCATIONS_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { LocationEntity } from '@/entities/location'

import { ConnectedLocationsTab } from './ConnectedLocationsTab'

const SORT = '[data-pc-section="sort"]'
const FILTER = '[data-cy="search-input"]'
const DROPDOWN = '[data-pc-name="multiselect"]'
const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'
const CHECKBOX = 'input[type="checkbox"]'
const DIALOG_HEADER = '[data-pc-section="header"]'
const DIALOG_CANCEL_BUTTON = '[aria-label="cancel"]'
const DIALOG_SUBMIT_BUTTON = '[aria-label="confirm"]'
const LOCATION_DATA = GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations
const BRANDS_DATA = GET_BRANDS_OPERATION_DEFAULT_RESPONSE.getBrands.brands
const CONNECTED_LOCATIONS_DATA =
  GET_WORKSHOP_CONNECTED_LOCATIONS_DEFAULT_RESPONSE.getWorkshopConnectedLocations.workshopConnectedLocations

const CONNECTED_LOCATION_IDS =
  CONNECTED_LOCATIONS_DATA?.map((connectedLocation) => connectedLocation.connectedLocationId) || []
const LOCATIONS_WITH_CONNECTED_FLAG = LOCATION_DATA?.map((location) => ({
  ...location,
  connected: CONNECTED_LOCATION_IDS.includes(location.id),
}))

type LocationWithConnectedEntity = LocationEntity & { connected: boolean }

const sortTableByChecked = (colIndex: number, base: boolean[], sorted: boolean[]) => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get(ROW).first().find(CHECKBOX).should('be.checked', firstBase)
  cy.get(ROW).last().find(CHECKBOX).should('be.checked', lastBase)

  // Ascending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CHECKBOX).should('not.be.checked', firstSorted)
  cy.get(ROW).last().find(CHECKBOX).should('be.checked', lastSorted)

  // Descending
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CHECKBOX).should('be.checked', lastSorted)
  cy.get(ROW).last().find(CHECKBOX).should('not.be.checked', firstSorted)

  // Back to default
  cy.get(SORT).eq(colIndex).click()
}

const filterTableByCheckedStatusDropdown = ({
  dropdownIndex,
  defaultLength,
  checkedStatusLength,
  uncheckedStatusLength,
}: {
  dropdownIndex: number
  defaultLength: number
  checkedStatusLength: number
  uncheckedStatusLength: number
}) => {
  cy.get('[data-pc-section="bodyrow"]').should('have.length', defaultLength)

  cy.get('[data-pc-name="dropdown"]').eq(dropdownIndex).click()
  cy.get('li[role="option"][aria-label="checked"]').click()
  cy.get('[data-pc-section="bodyrow"]').should('have.length', checkedStatusLength)

  cy.get('[data-pc-name="dropdown"]').eq(dropdownIndex).click()
  cy.get('li[role="option"][aria-label="unchecked"]').click()
  cy.get('[data-pc-section="bodyrow"]').should('have.length', uncheckedStatusLength)

  cy.get('[data-pc-section="clearicon"]').click()
  cy.get('[data-pc-section="bodyrow"]').should('have.length', defaultLength)
}

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

describe('ConnectedLocationsTab', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE)
      }
      if (hasOperationName(req, 'GetWorkshopConnectedLocations')) {
        aliasQuery(req, 'GetWorkshopConnectedLocations')
        successResponse(req, GET_WORKSHOP_CONNECTED_LOCATIONS_DEFAULT_RESPONSE)
      }
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<ConnectedLocationsTab />)
    cy.wait('@gqlGetLocationsQuery')
    cy.wait('@gqlGetWorkshopConnectedLocationsQuery')
    cy.wait('@gqlGetBrandsQuery')
  })

  it('renders the connected locations table with correct data', () => {
    const getLocationFields = (location: LocationWithConnectedEntity) => [
      location.code,
      location.name,
      location.brands.map((b) => b.code).join(''),
      location.address.postCode,
      location.address.city,
      location.address.address,
      '',
    ]

    LOCATIONS_WITH_CONNECTED_FLAG?.forEach((location, locationIndex) => {
      getLocationFields(location).forEach((field, fieldIndex) => {
        cy.get(ROW).eq(locationIndex).find(CELL).eq(fieldIndex).should('contain.text', field)
      })
    })
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

    cy.mountWithProviders(<ConnectedLocationsTab />)
    cy.wait('@gqlGetLocationsQuery')
    cy.wait('@gqlGetWorkshopConnectedLocationsQuery')

    cy.contains('No location details found').should('be.visible')
  })

  it('does not render table rows when GQL query errors', () => {
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

    cy.mountWithProviders(<ConnectedLocationsTab />)
    cy.wait('@gqlGetLocationsQuery')

    cy.contains('Error').should('be.visible')
  })

  it('renders checkbox field correctly based on connected value', () => {
    cy.get(ROW).each((row, index) => {
      const location = LOCATIONS_WITH_CONNECTED_FLAG[index]
      cy.wrap(row)
        .find(CHECKBOX)
        .should(location.connected ? 'be.checked' : 'not.be.checked')
    })
  })

  it('displays the CancelConnectionDialog when unchecking a connected location checkbox', () => {
    cy.get(ROW)
      .first()
      .within(() => {
        cy.get(CHECKBOX).should('be.checked').uncheck()
      })

    cy.get(DIALOG_HEADER).should('contain.text', 'Cancel location connection')
    cy.contains('Are you sure you want to unselect the location?').should('be.visible')

    cy.get(DIALOG_CANCEL_BUTTON).should('be.visible')
    cy.get(DIALOG_SUBMIT_BUTTON).should('be.visible')

    cy.get(DIALOG_CANCEL_BUTTON).click()
    cy.get(DIALOG_HEADER).should('not.exist')
  })

  it('sorts the table on sortable fields', () => {
    sortTable(
      0,
      [
        LOCATIONS_WITH_CONNECTED_FLAG[0].code,
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].code,
      ],
      [
        LOCATIONS_WITH_CONNECTED_FLAG[0].code,
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].code,
      ],
    )
    sortTable(
      1,
      [
        LOCATIONS_WITH_CONNECTED_FLAG[0].name,
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].name,
      ],
      [
        LOCATIONS_WITH_CONNECTED_FLAG[0].name,
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].name,
      ],
    )
    sortTable(
      2,
      [
        LOCATIONS_WITH_CONNECTED_FLAG[0].brands.map((b) => b.code).join(''),
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].brands.map((b) => b.code).join(''),
      ],
      [
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].brands.map((b) => b.code).join(''),
        LOCATIONS_WITH_CONNECTED_FLAG[0].brands.map((b) => b.code).join(''),
      ],
    )
    sortTable(
      3,
      [
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].address.postCode,
        LOCATIONS_WITH_CONNECTED_FLAG[0].address.postCode,
      ],
      [
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].address.postCode,
        LOCATIONS_WITH_CONNECTED_FLAG[0].address.postCode,
      ],
    )
    sortTable(
      4,
      [LOCATIONS_WITH_CONNECTED_FLAG[1].address.city, LOCATIONS_WITH_CONNECTED_FLAG[0].address.city],
      [LOCATIONS_WITH_CONNECTED_FLAG[1].address.city, LOCATIONS_WITH_CONNECTED_FLAG[2].address.city],
    )
    sortTable(
      5,
      [
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].address.address,
        LOCATIONS_WITH_CONNECTED_FLAG[2].address.address,
      ],
      [LOCATIONS_WITH_CONNECTED_FLAG[2].address.address, LOCATIONS_WITH_CONNECTED_FLAG[0].address.address],
    )
    sortTableByChecked(
      6,
      [
        LOCATIONS_WITH_CONNECTED_FLAG[0].connected,
        LOCATIONS_WITH_CONNECTED_FLAG[LOCATIONS_WITH_CONNECTED_FLAG.length - 1].connected,
      ],
      [LOCATIONS_WITH_CONNECTED_FLAG[2].connected, LOCATIONS_WITH_CONNECTED_FLAG[0].connected],
    )
  })

  it('filters the table on all fields', () => {
    cy.mountWithProviders(<ConnectedLocationsTab />)
    cy.wait('@gqlGetLocationsQuery')
    cy.wait('@gqlGetWorkshopConnectedLocationsQuery')

    filterTableBySearch(0, LOCATIONS_WITH_CONNECTED_FLAG[0].code, LOCATIONS_WITH_CONNECTED_FLAG.length, 1)
    filterTableBySearch(1, LOCATIONS_WITH_CONNECTED_FLAG[0].name, LOCATIONS_WITH_CONNECTED_FLAG.length, 1)
    filterTableByDropdown(0, BRANDS_DATA[1].code, LOCATIONS_WITH_CONNECTED_FLAG.length, 1)
    filterTableBySearch(2, LOCATIONS_WITH_CONNECTED_FLAG[0].address.postCode, LOCATIONS_WITH_CONNECTED_FLAG.length, 1)
    filterTableBySearch(3, LOCATIONS_WITH_CONNECTED_FLAG[0].address.city, LOCATIONS_WITH_CONNECTED_FLAG.length, 1)
    filterTableBySearch(4, LOCATIONS_WITH_CONNECTED_FLAG[0].address.address, LOCATIONS_WITH_CONNECTED_FLAG.length, 1)
    filterTableByCheckedStatusDropdown({
      dropdownIndex: 0,
      defaultLength: LOCATIONS_WITH_CONNECTED_FLAG.length,
      checkedStatusLength: 2,
      uncheckedStatusLength: 2,
    })
  })
})
