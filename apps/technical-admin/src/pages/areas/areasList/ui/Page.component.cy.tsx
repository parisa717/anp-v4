import { GET_AREAS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import AreasListPage from './Page'

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'
const SORT = '[data-pc-section="sort"]'
const FILTER = '[data-cy="search-input"]'
const DROPDOWN = '[data-cy="datatable-dropdown"]'

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

  // Default
  cy.get(SORT).eq(colIndex).click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstBase)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastBase)
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

describe('AreasListPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')
        successResponse(req, GET_AREAS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<AreasListPage />)
    cy.wait('@gqlGetAreasQuery')
  })

  it('renders the table with areas', () => {
    const getAreaFields = (area: (typeof GET_AREAS_OPERATION_DEFAULT_RESPONSE)['getAreas']['areas'][number]) => [
      area.id,
      area.name,
      area.address.country.name,
      area.address.postCode,
      area.address.city,
      area.address.address,
      area.isActive ? 'active' : 'inactive',
    ]

    GET_AREAS_OPERATION_DEFAULT_RESPONSE.getAreas.areas?.forEach((area, areaIndex) => {
      getAreaFields(area).forEach((field, fieldIndex) => {
        cy.get(ROW).eq(areaIndex).find(CELL).eq(fieldIndex).should('contain.text', field)
      })
    })
  })

  it('sorts the table on all fields', () => {
    sortTable(0, ['94', '80'], ['02', '94'])
    sortTable(1, ['Konklux', 'Stim'], ['Alpha', 'Trippledex'])
    sortTable(2, ['Poland', 'Austria'], ['Austria', 'Poland'])
    sortTable(3, ['22-604', '84-240'], ['05-090', '95-063'])
    sortTable(4, ['Tarnawatka', 'Reda'], ['Kołaczyce', 'Wilczyce'])
    sortTable(5, ['968 Kensington Terrace', '03590 Delaware Drive'], ['9 Springview Drive', '72810 Kings Street'])
    sortTable(6, ['inactive', 'active'], ['inactive', 'active'])
  })

  it('filters the table on all fields', () => {
    filterTableBySearch(0, '6', 10, 2)
    filterTableBySearch(0, '64', 10, 1)
    filterTableBySearch(1, 'lot', 10, 2)
    filterTableBySearch(1, 'lots', 10, 1)
    filterTableBySearch(2, 'p', 10, 5)
    filterTableBySearch(3, '2', 10, 7)
    filterTableBySearch(3, '22', 10, 1)
    filterTableBySearch(4, 'o', 10, 6)
    filterTableBySearch(4, 'ol', 10, 2)
    filterTableBySearch(5, '9', 10, 4)
    filterTableBySearch(5, '96', 10, 1)
    filterTableByDropdown(0, 'Active', 10, 3)
  })

  it('does not render table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<AreasListPage />)
    cy.wait('@gqlGetAreasQuery')

    cy.contains('No areas found').should('be.visible')
  })
})
