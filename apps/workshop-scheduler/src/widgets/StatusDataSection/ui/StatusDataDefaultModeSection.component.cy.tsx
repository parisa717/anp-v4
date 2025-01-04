import {
  GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { BusinessStatusMode } from '@/widgets/StatusDataSection'

import { StatusDataSection } from './StatusDataSection'

const BUSINESS_STATUSES_DATA =
  GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE.getWorkshopAppointmentBusinessStatuses.businessStatuses
const ADDITIONAL_BUSINESS_STATUSES_DATA =
  GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE
    .getLocationWorkshopAppointmentAdditionalBusinessStatuses.additionalBusinessStatuses

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'

const STATUSES_COLUMN_INDEXES = {
  REORDER: 0,
  NAME: 1,
  DEFAULT: 2,
  STATUS: 3,
  EDIT_BUTTON: 4,
}

const ADDITIONAL_STATUSES_COLUMN_INDEXES = {
  HIGHLIGHT: 2,
}

describe('StatusDataSection in Default Mode', () => {
  describe('isAdditionalBusinessStatus is false', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetBusinessStatuses')) {
          aliasQuery(req, 'GetBusinessStatuses')
          successResponse(req, GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.mountWithProviders(<StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.Default} />)
      cy.wait('@gqlGetBusinessStatusesQuery')
    })

    describe('renders correctly', () => {
      it('renders the table with the correct data', () => {
        cy.get(ROW).should('have.length', BUSINESS_STATUSES_DATA.length)

        cy.get(ROW).each((row, index) => {
          // Reorder column
          if (!BUSINESS_STATUSES_DATA[index].isDefault) {
            const reorderCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.REORDER)
            reorderCell.find('svg').should('have.attr', 'data-pc-section', 'rowreordericon')
          }

          // Name column
          const nameCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.NAME)
          nameCell.should('contain.text', BUSINESS_STATUSES_DATA[index].name)

          // Default column
          const defaultCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.DEFAULT)

          if (BUSINESS_STATUSES_DATA[index].isDefault) {
            defaultCell.find('i').should('exist')
          }

          if (!BUSINESS_STATUSES_DATA[index].isDefault) {
            defaultCell.should('be.empty').and('match', ':empty')
          }

          // Status column

          const statusCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.STATUS)
          statusCell.should('contain.text', BUSINESS_STATUSES_DATA[index].isActive ? 'active' : 'inactive')

          // Edit button
          const editButtonCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.EDIT_BUTTON)
          editButtonCell.should('contain.text', 'edit')
        })
      })

      it('renders empty message when there is no data', () => {
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'GetBusinessStatuses')) {
            aliasQuery(req, 'GetBusinessStatuses')
            successResponse(req, { businessStatuses: [] })
          }
        })

        cy.mountWithProviders(
          <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.Default} />,
        )
        cy.wait('@gqlGetBusinessStatusesQuery')

        cy.contains('No statuses found').should('exist')
      })

      it('does not render table rows when GQL query errors', () => {
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'GetBusinessStatuses')) {
            aliasQuery(req, 'GetBusinessStatuses')
            errorResponse(req, {
              message: 'User not authenticated',
              path: ['currentUser'],
              extensions: { code: 'UNAUTHENTICATED' },
            })
          }
        })

        cy.mountWithProviders(
          <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.Default} />,
        )
        cy.wait('@gqlGetBusinessStatusesQuery')

        cy.get(ROW).should('not.exist')
      })
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAdditionalBusinessStatuses')) {
          aliasQuery(req, 'GetAdditionalBusinessStatuses')
          successResponse(req, GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.mountWithProviders(<StatusDataSection isAdditionalBusinessStatus mode={BusinessStatusMode.Default} />)
      cy.wait('@gqlGetAdditionalBusinessStatusesQuery')
    })

    describe('renders correctly', () => {
      it('renders the highlighted slots column when isAdditionalBusinessStatus is true', () => {
        cy.get(ROW).each((row, index) => {
          // Highlight column
          const highlightCell = cy.wrap(row).find(CELL).eq(ADDITIONAL_STATUSES_COLUMN_INDEXES.HIGHLIGHT)

          if (ADDITIONAL_BUSINESS_STATUSES_DATA[index]?.isHighlighted) {
            highlightCell.find('i').should('exist')
          }

          if (!ADDITIONAL_BUSINESS_STATUSES_DATA?.[index]?.isHighlighted) {
            highlightCell.should('be.empty').and('match', ':empty')
          }
        })
      })
    })
  })
})
