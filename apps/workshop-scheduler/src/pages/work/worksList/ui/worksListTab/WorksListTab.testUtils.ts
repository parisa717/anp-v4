import { filterWorks, GET_WORKSHOP_WORKS_DEFAULT_RESPONSE, paginateWorks, sortWorkshopWorks } from '@cypress-fixtures'
import { COMMON_TEST_SELECTORS } from '@nexus-ui/utils'

import { WorkEntity } from '@/entities/work'
import { SortDirection } from '@/shared/api/types.generated'

const WORKS_DATA = GET_WORKSHOP_WORKS_DEFAULT_RESPONSE.getWorkshopWorks.works

const { CELL, CHECKED_LABEL, CLEAR, DROPDOWN, FILTER, ITEM, ROW, SORT_BUTTON, STATUS_DROPDOWN, UNCHECKED_LABEL } =
  COMMON_TEST_SELECTORS

export const verifyTableRendering = (columnsData: string[][]) => {
  cy.get(ROW).each((row, rowIndex) => {
    cy.wrap(row)
      .find(CELL)
      .each((cell, columnIndex) => {
        cy.wrap(cell).should('contain.text', columnsData[rowIndex][columnIndex])
      })
  })
}

export const getWorkEntityFieldValue = (work: WorkEntity, fieldName: string) => {
  switch (fieldName) {
    case 'name':
      return work.name
    case 'qualification':
      return work.qualification.name
    case 'isActive':
      return work.isActive ? 'active' : 'inactive'
    default:
      return ''
  }
}

export const sortTable = (colIndex: number, sortIndex: number, fieldName: string) => {
  const sortedAscData = sortWorkshopWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE, {
    field: fieldName,
    direction: SortDirection.Asc,
  })
  const paginatedAscData = paginateWorks(sortedAscData.getWorkshopWorks.works, { limit: 10 })

  const sortedDescData = sortWorkshopWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE, {
    field: fieldName,
    direction: SortDirection.Desc,
  })
  const paginatedDescData = paginateWorks(sortedDescData.getWorkshopWorks.works, { limit: 10 })

  // Ascending
  cy.get(SORT_BUTTON).eq(sortIndex).click()
  cy.wait('@gqlGetWorkshopWorksQuery')

  cy.get(ROW)
    .first()
    .find(CELL)
    .eq(colIndex)
    .should('include.text', getWorkEntityFieldValue(paginatedAscData.works[0], fieldName))
  cy.get(ROW)
    .last()
    .find(CELL)
    .eq(colIndex)
    .should('include.text', getWorkEntityFieldValue(paginatedAscData.works[9], fieldName))

  // Descending
  cy.get(SORT_BUTTON).eq(sortIndex).click()
  cy.wait('@gqlGetWorkshopWorksQuery')

  cy.get(ROW)
    .first()
    .find(CELL)
    .eq(colIndex)
    .should('include.text', getWorkEntityFieldValue(paginatedDescData.works[0], fieldName))
  cy.get(ROW)
    .last()
    .find(CELL)
    .eq(colIndex)
    .should('include.text', getWorkEntityFieldValue(paginatedDescData.works[9], fieldName))
}

export const filterTableBySearch = (searchInputIndex: number, fieldName: string, query: string) => {
  // Initial length should be 10 due to pagination
  cy.get(ROW).should('have.length', 10)

  const filteredData = filterWorks(WORKS_DATA, {
    [fieldName]: query,
  })
  const paginatedFilteredData = paginateWorks(filteredData, { limit: 10 })

  cy.get(FILTER).eq(searchInputIndex).focus().realType(query)
  cy.wait('@gqlGetWorkshopWorksQuery')

  const expectedLength = Math.min(paginatedFilteredData.totalResults, 10)
  cy.get(ROW).should('have.length', expectedLength)

  cy.get(FILTER).eq(searchInputIndex).focus().clear()
  // now we do not have to wait for the server for filter to be applied because prev result was cached by RTKQ
  cy.get(ROW).should('have.length', 10)
}

export const filterTableByDropdown = (dropdownIndex: number, fieldName: string, query: string, filterIds: string[]) => {
  cy.get(ROW).should('have.length', 10)

  const filteredData = filterWorks(WORKS_DATA, {
    [fieldName]: filterIds,
  })
  const paginatedFilteredData = paginateWorks(filteredData, { limit: 10 })

  cy.get(DROPDOWN).eq(dropdownIndex).realClick()
  cy.get(ITEM).contains(query, { matchCase: false }).realClick()
  cy.wait('@gqlGetWorkshopWorksQuery')

  const expectedLength = Math.min(paginatedFilteredData.totalResults, 10)
  cy.get(ROW).should('have.length', expectedLength)

  cy.get(DROPDOWN).find(CLEAR).realClick()
  cy.wait('@gqlGetWorkshopWorksQuery')
  cy.get(ROW).should('have.length', 10)
}

export const filterTableByCheckedStatusDropdown = (dropdownIndex: number, fieldName: string) => {
  cy.get(ROW).should('have.length', 10)

  const checkedFilteredData = filterWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE.getWorkshopWorks.works, {
    [fieldName]: true,
  })
  const paginatedCheckedData = paginateWorks(checkedFilteredData, { limit: 10 })

  const uncheckedFilteredData = filterWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE.getWorkshopWorks.works, {
    [fieldName]: false,
  })
  const paginatedUncheckedData = paginateWorks(uncheckedFilteredData, { limit: 10 })

  cy.get(STATUS_DROPDOWN).eq(dropdownIndex).click()
  cy.get(CHECKED_LABEL).click()

  cy.wait('@gqlGetWorkshopWorksQuery')
  cy.get(ROW).should('have.length', Math.min(paginatedCheckedData.totalResults, 10))

  cy.get(STATUS_DROPDOWN).eq(dropdownIndex).click()
  cy.get(UNCHECKED_LABEL).click()

  cy.wait('@gqlGetWorkshopWorksQuery')
  cy.get(ROW).should('have.length', Math.min(paginatedUncheckedData.totalResults, 10))

  cy.get(CLEAR).click()
  cy.get(ROW).should('have.length', 10)
}
