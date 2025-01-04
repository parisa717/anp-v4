import { GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import ColorSetupListPage from './Page'

const AVAILABILITY_COLORS_DATA = GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE.getAvailabilityColors.availabilityColors

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'

const TABLE_COLUMN_INDEXES = {
  COLOR: 0,
  CAPACITY_VALUE: 1,
}

describe('ColorSetupListPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAvailabilityColors')) {
        aliasQuery(req, 'GetAvailabilityColors')
        successResponse(req, GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<ColorSetupListPage />)
    cy.wait('@gqlGetAvailabilityColorsQuery')
  })

  describe('renders correctly', () => {
    it('renders the table with the correct data', () => {
      cy.get(ROW).should('have.length', AVAILABILITY_COLORS_DATA.length)

      cy.get(ROW).each((row, index) => {
        // Color column
        const colorCell = cy.wrap(row).find(CELL).eq(TABLE_COLUMN_INDEXES.COLOR)
        colorCell.should('contain.text', AVAILABILITY_COLORS_DATA[index].color)

        // Capacity Value column
        const capacityValueCell = cy.wrap(row).find(CELL).eq(TABLE_COLUMN_INDEXES.CAPACITY_VALUE)

        if (AVAILABILITY_COLORS_DATA[index].maximumCapacity) {
          capacityValueCell.should('contain.text', '%')
          capacityValueCell.should('contain.text', AVAILABILITY_COLORS_DATA[index].minimalCapacity)
          capacityValueCell.should('contain.text', AVAILABILITY_COLORS_DATA[index].maximumCapacity)
        }

        if (!AVAILABILITY_COLORS_DATA[index].maximumCapacity) {
          capacityValueCell.should('contain.text', '%')
          capacityValueCell.should('contain.text', '>')
          capacityValueCell.should('contain.text', AVAILABILITY_COLORS_DATA[index].minimalCapacity)
          capacityValueCell.should('not.contain.text', AVAILABILITY_COLORS_DATA[index].maximumCapacity)
        }
      })
    })

    it('add button is disabled when there are more than 4 entries', () => {
      cy.get('button[aria-label="Add Color"]').should('be.disabled')
    })

    it('renders empty message when there is no data', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAvailabilityColors')) {
          aliasQuery(req, 'GetAvailabilityColors')
          successResponse(req, { availabilityColors: [] })
        }
      })

      cy.mountWithProviders(<ColorSetupListPage />)
      cy.wait('@gqlGetAvailabilityColorsQuery')

      cy.contains('No colors found').should('exist')
    })

    it('does not render table rows when GQL query errors', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAvailabilityColors')) {
          aliasQuery(req, 'GetAvailabilityColors')
          errorResponse(req, {
            message: 'User not authenticated',
            path: ['currentUser'],
            extensions: { code: 'UNAUTHENTICATED' },
          })
        }
      })

      cy.mountWithProviders(<ColorSetupListPage />)
      cy.wait('@gqlGetAvailabilityColorsQuery')

      cy.get(ROW).should('not.exist')
    })
  })
})
