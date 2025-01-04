import {
  filterWorks,
  GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
  GET_QUALIFICATIONS_DEFAULT_RESPONSE,
  GET_WORKSHOP_WORKS_DEFAULT_RESPONSE,
  paginateWorks,
  sortWorkshopWorks,
} from '@cypress-fixtures'
import {
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  hasVariablesDefined,
  successResponse,
} from '@nexus-ui/utils'

import { WorkEntity } from '@/entities/work'
import { SortDirection } from '@/shared/api/types.generated'

import { WorksListTab } from './WorksListTab'
import {
  filterTableByCheckedStatusDropdown,
  filterTableByDropdown,
  filterTableBySearch,
  getWorkEntityFieldValue,
  sortTable,
  verifyTableRendering,
} from './WorksListTab.testUtils'

const WORKS_DATA = GET_WORKSHOP_WORKS_DEFAULT_RESPONSE.getWorkshopWorks.works
const BRANDS_DATA = GET_BRANDS_OPERATION_DEFAULT_RESPONSE.getBrands.brands
const QUALIFICATIONS_DATA = GET_QUALIFICATIONS_DEFAULT_RESPONSE.getQualifications.qualifications

const { CELL, FILTER, ROW, ROWS_PER_PAGE_25, ROWS_PER_PAGE_50, ROWS_PER_PAGE_DROPDOWN, SORT_BUTTON } =
  COMMON_TEST_SELECTORS

describe('WorksListTab component', () => {
  describe('basis rendering', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetWorkshopWorks')) {
          aliasQuery(req, 'GetWorkshopWorks')
          const paginatedData = paginateWorks(WORKS_DATA, {
            offset: req.body.variables.pagination?.offset || 0,
            limit: req.body.variables.pagination?.limit || 10,
          })

          successResponse(req, {
            getWorkshopWorks: {
              works: paginatedData.works,
              metadata: {
                totalResults: paginatedData.totalResults,
                sort: { field: 'id', direction: SortDirection.Asc },
              },
            },
          })
        }
        if (hasOperationName(req, 'GetBrands')) {
          aliasQuery(req, 'GetBrands')
          successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
        }
        if (hasOperationName(req, 'GetQualifications')) {
          aliasQuery(req, 'GetQualifications')
          successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
        }
      })
    })

    beforeEach(() => {
      cy.mountWithProviders(<WorksListTab />)
      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.wait('@gqlGetBrandsQuery')
      cy.wait('@gqlGetQualificationsQuery')
    })

    it('renders the works list table correctly', () => {
      const getWorksFields = (work: WorkEntity) => [
        work.name,
        work.brands.map((b) => b.name).join(''),
        work.brands.map((b) => b.timeUnits).join(''),
        work.qualification.name,
        '',
        '',
        'active',
        'edit',
      ]

      // by default, only the first 10 paginated items are rendered
      cy.get(ROW).should('have.length', 10)

      verifyTableRendering(WORKS_DATA.map((work) => getWorksFields(work)))
    })

    it('renders an empty message when no works data is available', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetWorkshopWorks')) {
          aliasQuery(req, 'GetWorkshopWorks')
          successResponse(req, { getWorkshopWorks: { works: [], metadata: { totalResults: 0 } } })
        }
      })

      cy.mountWithProviders(<WorksListTab />)
      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.contains('No works to be carried out found').should('be.visible')
    })

    it('does not render works list table rows when GQL query errors', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetWorkshopWorks')) {
          aliasQuery(req, 'GetWorkshopWorks')
          errorResponse(req, {
            message: 'User not authenticated',
            path: ['currentUser'],
            extensions: { code: 'UNAUTHENTICATED' },
          })
        }
      })

      cy.mountWithProviders(<WorksListTab />)
      cy.wait('@gqlGetWorkshopWorksQuery')

      cy.get(ROW).should('not.exist')
    })
  })

  describe('Sorting', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (
          hasOperationName(req, 'GetWorkshopWorks') &&
          hasVariablesDefined(req, (vars) => typeof vars.sort?.field !== 'undefined')
        ) {
          aliasQuery(req, 'GetWorkshopWorks')

          const sortedData = sortWorkshopWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE, {
            field: req.body.variables.sort.field,
            direction: req.body.variables.sort.direction,
          })

          const paginatedData = paginateWorks(sortedData.getWorkshopWorks.works, {
            offset: req.body.variables.pagination?.offset || 0,
            limit: req.body.variables.pagination?.limit || 10,
          })

          successResponse(req, {
            getWorkshopWorks: {
              works: paginatedData.works,
              metadata: {
                totalResults: paginatedData.totalResults,
                sort: {
                  field: req.body.variables.sort.field,
                  direction: req.body.variables.sort.direction,
                },
              },
            },
          })
        }

        if (hasOperationName(req, 'GetBrands')) {
          aliasQuery(req, 'GetBrands')
          successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
        }
        if (hasOperationName(req, 'GetQualifications')) {
          aliasQuery(req, 'GetQualifications')
          successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
        }
      })
    })

    beforeEach(() => {
      cy.mountWithProviders(<WorksListTab />)
      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.wait('@gqlGetBrandsQuery')
      cy.wait('@gqlGetQualificationsQuery')
    })

    it('sorts by name', () => {
      sortTable(0, 0, 'name')
    })

    it('sorts by productive team', () => {
      sortTable(3, 1, 'qualification')
    })

    it('sorts by status', () => {
      sortTable(6, 4, 'isActive')
    })
  })

  describe('Filtering', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (
          hasOperationName(req, 'GetWorkshopWorks') &&
          hasVariablesDefined(req, (vars) => typeof vars.filter !== 'undefined')
        ) {
          aliasQuery(req, 'GetWorkshopWorks')

          const filteredData = filterWorks(WORKS_DATA, req.body.variables.filter)
          const paginatedFilteredData = paginateWorks(filteredData, { limit: 10 })

          successResponse(req, {
            getWorkshopWorks: {
              works: paginatedFilteredData.works,
              metadata: {
                totalResults: paginatedFilteredData.totalResults,
                sort: {
                  field: req.body.variables.sort.field,
                  direction: req.body.variables.sort.direction,
                },
              },
            },
          })
        }

        if (hasOperationName(req, 'GetBrands')) {
          aliasQuery(req, 'GetBrands')
          successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
        }
        if (hasOperationName(req, 'GetQualifications')) {
          aliasQuery(req, 'GetQualifications')
          successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
        }
      })
    })

    beforeEach(() => {
      cy.mountWithProviders(<WorksListTab />)

      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.wait('@gqlGetBrandsQuery')
      cy.wait('@gqlGetQualificationsQuery')
    })

    it('filters by name', () => {
      filterTableBySearch(0, 'name', WORKS_DATA[0].name)
    })

    it('filters by brand', () => {
      filterTableByDropdown(0, 'brand', BRANDS_DATA[0].code, [BRANDS_DATA[0].id])
    })

    it('filters by qualification', () => {
      filterTableByDropdown(1, 'qualification', QUALIFICATIONS_DATA[0].name, [QUALIFICATIONS_DATA[0].id])
    })

    it('filters by capacity editable', () => {
      filterTableByCheckedStatusDropdown(0, 'isCapacityEditable')
    })

    it('filters by description editable', () => {
      filterTableByCheckedStatusDropdown(1, 'isDescriptionEditable')
    })
  })

  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (
          hasOperationName(req, 'GetWorkshopWorks') &&
          hasVariablesDefined(req, (vars) => typeof vars.pagination !== 'undefined')
        ) {
          aliasQuery(req, 'GetWorkshopWorks')

          const sortedData = sortWorkshopWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE, {
            field: req.body.variables.sort.field,
            direction: req.body.variables.sort.direction,
          })
          const filteredData = filterWorks(sortedData.getWorkshopWorks.works, req.body.variables.filter)
          const paginatedData = paginateWorks(filteredData, {
            offset: req.body.variables.pagination?.offset || 0,
            limit: req.body.variables.pagination?.limit || 10,
          })

          successResponse(req, {
            getWorkshopWorks: {
              works: paginatedData.works,
              metadata: {
                totalResults: WORKS_DATA.length,
                sort: { field: null, direction: null },
              },
            },
          })
        }

        if (hasOperationName(req, 'GetBrands')) {
          aliasQuery(req, 'GetBrands')
          successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
        }
        if (hasOperationName(req, 'GetQualifications')) {
          aliasQuery(req, 'GetQualifications')
          successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
        }
      })
    })

    beforeEach(() => {
      cy.mountWithProviders(<WorksListTab />)

      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.wait('@gqlGetBrandsQuery')
      cy.wait('@gqlGetQualificationsQuery')
    })

    it('changes items per page to 25 and 50', () => {
      cy.get(ROW).should('have.length', 10)

      cy.get(ROWS_PER_PAGE_DROPDOWN).click()
      cy.get(ROWS_PER_PAGE_25).click()

      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.get(ROW).should('have.length', 25)

      cy.get(ROWS_PER_PAGE_DROPDOWN).click()
      cy.get(ROWS_PER_PAGE_50).click()

      cy.wait('@gqlGetWorkshopWorksQuery')
      cy.get(ROW).should('have.length', 50)
    })

    it('works with sorting when changing items per page', () => {
      // Sort by name ascending
      cy.get(SORT_BUTTON).eq(0).click()
      cy.wait('@gqlGetWorkshopWorksQuery')

      const sortedData = sortWorkshopWorks(GET_WORKSHOP_WORKS_DEFAULT_RESPONSE, {
        field: 'name',
        direction: SortDirection.Asc,
      })

      cy.get(ROWS_PER_PAGE_DROPDOWN).click()
      cy.get(ROWS_PER_PAGE_25).click()

      cy.wait('@gqlGetWorkshopWorksQuery')

      const paginatedSortedData = paginateWorks(sortedData.getWorkshopWorks.works, { limit: 25 })

      cy.get(ROW).should('have.length', 25)
      cy.get(ROW)
        .first()
        .find(CELL)
        .eq(0)
        .should('include.text', getWorkEntityFieldValue(paginatedSortedData.works[0], 'name'))

      cy.get(ROW)
        .last()
        .find(CELL)
        .eq(0)
        .should('include.text', getWorkEntityFieldValue(paginatedSortedData.works[24], 'name'))
    })

    it('works with filtering when changing items per page', () => {
      // Apply name filter
      const searchQuery = WORKS_DATA[0].name
      cy.get(FILTER).eq(0).focus().realType(searchQuery)
      cy.wait('@gqlGetWorkshopWorksQuery')

      const filteredData = filterWorks(WORKS_DATA, { name: searchQuery })

      cy.get(ROWS_PER_PAGE_DROPDOWN).click()
      cy.get(ROWS_PER_PAGE_25).click()
      cy.wait('@gqlGetWorkshopWorksQuery')

      const paginatedFilteredData = paginateWorks(filteredData, { limit: 25 })
      const expectedLength = Math.min(paginatedFilteredData.totalResults, 25)

      cy.get(ROW).should('have.length', expectedLength)
    })

    it('handles pagination with combined sorting and filtering', () => {
      // Apply name filter first
      const searchQuery = WORKS_DATA[0].name
      cy.get(FILTER).eq(0).focus().realType(searchQuery)
      cy.wait('@gqlGetWorkshopWorksQuery')

      // Then sort by name ascending
      cy.get(SORT_BUTTON).eq(0).click()
      cy.wait('@gqlGetWorkshopWorksQuery')

      const filteredData = filterWorks(WORKS_DATA, { name: searchQuery })
      const sortedFilteredData = sortWorkshopWorks(
        {
          getWorkshopWorks: {
            works: filteredData,
            metadata: { totalResults: filteredData.length, sort: { field: 'name', direction: SortDirection.Asc } },
          },
        },
        { field: 'name', direction: SortDirection.Asc },
      )

      cy.get(ROWS_PER_PAGE_DROPDOWN).click()
      cy.get(ROWS_PER_PAGE_25).click()
      cy.wait('@gqlGetWorkshopWorksQuery')

      const paginatedData = paginateWorks(sortedFilteredData.getWorkshopWorks.works, { limit: 25 })
      const expectedLength = Math.min(paginatedData.totalResults, 25)
      cy.get(ROW).should('have.length', expectedLength)

      if (expectedLength > 0) {
        cy.get(ROW)
          .first()
          .find(CELL)
          .eq(0)
          .should('include.text', getWorkEntityFieldValue(paginatedData.works[0], 'name'))
      }
    })
  })
})
