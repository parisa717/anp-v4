import {
  GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE,
  UNASSIGN_ADDITIONAL_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE,
  UNASSIGN_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { getStore } from '@/app/store'
import { BusinessStatusEntity } from '@/entities/businessStatus'
import { setCurrentLocation } from '@/entities/location'
import { BusinessStatusMode } from '@/widgets/StatusDataSection'

import { StatusDataSection } from './StatusDataSection'

const BUSINESS_STATUSES_BY_LOCATION_DATA =
  GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE.getLocationWorkshopAppointmentBusinessStatuses
    .businessStatuses

const ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_DATA =
  GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE
    .getLocationWorkshopAppointmentAdditionalBusinessStatuses.additionalBusinessStatuses

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'
const SORT = '[data-pc-section="sort"]'

const STATUSES_COLUMN_INDEXES = {
  NAME: 0,
  DEFAULT: 1,
  DELETE_BUTTON: 2,
}

const ADDITIONAL_STATUSES_COLUMN_INDEXES = {
  HIGHLIGHT: 2,
  DELETE_BUTTON: 3,
}

describe('StatusDataSection in Location Mode', () => {
  describe('isAdditionalBusinessStatus is false', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetBusinessStatusesByLocation')) {
          aliasQuery(req, 'GetBusinessStatusesByLocation')
          successResponse(req, GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      // We need to set the current location before the widget is rendered

      const store = getStore()

      store.dispatch(setCurrentLocation(GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations[0]))

      cy.mountWithProviders(
        <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.ByLocation} />,
        { reduxStore: store },
      )

      cy.wait('@gqlGetBusinessStatusesByLocationQuery')
    })

    describe('renders correctly', () => {
      it('renders the table with the correct data', () => {
        cy.get(ROW).should('have.length', BUSINESS_STATUSES_BY_LOCATION_DATA.length)

        cy.get(ROW).each((row, index) => {
          // Name column
          const nameCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.NAME)
          nameCell.should('contain.text', BUSINESS_STATUSES_BY_LOCATION_DATA[index].name)

          // Default column
          const defaultCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.DEFAULT)

          if (BUSINESS_STATUSES_BY_LOCATION_DATA[index].isDefault) {
            defaultCell.find('i').should('exist')
          }

          if (BUSINESS_STATUSES_BY_LOCATION_DATA[index].isDefault) {
            defaultCell.should('be.empty').and('match', ':empty')
          }
        })
      })

      it('should not render delete button when status is default', () => {
        cy.get(ROW).each((row, index) => {
          const businessStatus = BUSINESS_STATUSES_BY_LOCATION_DATA[index]
          const deleteButtonCell = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.DELETE_BUTTON)

          if (businessStatus?.isDefault) {
            deleteButtonCell.should('not.contain.text', 'delete')
          }

          if (!businessStatus?.isDefault) {
            deleteButtonCell.should('contain.text', 'delete')
          }
        })
      })

      it('renders empty message when there is no data', () => {
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'GetBusinessStatusesByLocation')) {
            aliasQuery(req, 'GetBusinessStatusesByLocation')
            successResponse(req, { businessStatuses: [] })
          }
        })

        cy.mountWithProviders(
          <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.ByLocation} />,
        )
        cy.wait('@gqlGetBusinessStatusesByLocationQuery')

        cy.contains('No statuses found').should('exist')
      })

      it('does not render table rows when GQL query errors', () => {
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'GetBusinessStatusesByLocation')) {
            aliasQuery(req, 'GetBusinessStatusesByLocation')
            errorResponse(req, {
              message: 'User not authenticated',
              path: ['currentUser'],
              extensions: { code: 'UNAUTHENTICATED' },
            })
          }
        })

        cy.mountWithProviders(
          <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.ByLocation} />,
        )
        cy.wait('@gqlGetBusinessStatusesByLocationQuery')

        cy.get(ROW).should('not.exist')
      })
    })

    describe('delete functionality', () => {
      it('should not render delete button when status is default', () => {
        cy.get(ROW).each((row, index) => {
          const businessStatus = BUSINESS_STATUSES_BY_LOCATION_DATA[index]
          const deleteButton = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.DELETE_BUTTON).find('button')

          if (businessStatus?.isDefault) {
            deleteButton.should('not.exist')
          }
          if (!businessStatus?.isDefault) {
            deleteButton.should('exist')
          }
        })
      })

      it('executes useUnassignBusinessStatusFromLocationMutation when delete button is clicked', () => {
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'UnassignBusinessStatusFromLocation')) {
            aliasMutation(req, 'UnassignBusinessStatusFromLocation')

            const firstNonDefaultRow = BUSINESS_STATUSES_BY_LOCATION_DATA.find(
              (businessStatus) => !businessStatus.isDefault,
            )
            expect(req.body.variables.businessStatusId).to.deep.equal(firstNonDefaultRow?.id)

            successResponse(req, UNASSIGN_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE)
          }
        })

        cy.mountWithProviders(
          <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.ByLocation} />,
        )

        cy.wait('@gqlGetBusinessStatusesByLocationQuery')

        cy.get(ROW).each((row, index) => {
          const businessStatus = BUSINESS_STATUSES_BY_LOCATION_DATA[index]

          if (!businessStatus.isDefault) {
            const deleteButton = cy.wrap(row).find(CELL).eq(STATUSES_COLUMN_INDEXES.DELETE_BUTTON).find('button')
            deleteButton.click()

            cy.wait('@gqlUnassignBusinessStatusFromLocationMutation')
          }
        })
      })
    })

    describe('sorts the table correctly', () => {
      const changeSortOrder = (index: number) => cy.get(SORT).eq(index).click()

      it('should sort by name', () => {
        const checkIfNameIsPresent = (businessStatus: BusinessStatusEntity | null, index: number) =>
          cy.get(ROW).eq(index).find(CELL).eq(STATUSES_COLUMN_INDEXES.NAME).should('contain.text', businessStatus?.name)

        // Ascending
        changeSortOrder(0)

        BUSINESS_STATUSES_BY_LOCATION_DATA.toSorted((a, b) => a?.name?.localeCompare(b?.name ?? '') ?? 0).forEach(
          checkIfNameIsPresent,
        )

        // Descending
        changeSortOrder(0)

        BUSINESS_STATUSES_BY_LOCATION_DATA.toSorted((a, b) => (b?.name ?? '').localeCompare(a?.name ?? '')).forEach(
          checkIfNameIsPresent,
        )

        // Goes back to default
        changeSortOrder(0)

        BUSINESS_STATUSES_BY_LOCATION_DATA.forEach(checkIfNameIsPresent)
      })

      it('should sort by default', () => {
        const checkIfDefaultIsPresent = (businessStatus: BusinessStatusEntity | null, index: number) => {
          const defaultCell = cy.get(ROW).eq(index).find(CELL).eq(STATUSES_COLUMN_INDEXES.DEFAULT)

          if (businessStatus?.isDefault) {
            defaultCell.find('i').should('exist')
          }

          if (!businessStatus?.isDefault) {
            defaultCell
              .should('be.empty')
              // also matches CSS selector ":empty"
              .and('match', ':empty')
          }
        }

        // Ascending
        changeSortOrder(1)

        BUSINESS_STATUSES_BY_LOCATION_DATA.toSorted((a, b) => (a?.isDefault ? 1 : 0) - (b?.isDefault ? 1 : 0)).forEach(
          checkIfDefaultIsPresent,
        )

        // Descending
        changeSortOrder(1)

        BUSINESS_STATUSES_BY_LOCATION_DATA.toSorted((a, b) => (b?.isDefault ? 1 : 0) - (a?.isDefault ? 1 : 0)).forEach(
          checkIfDefaultIsPresent,
        )

        // Goes back to default
        changeSortOrder(1)

        BUSINESS_STATUSES_BY_LOCATION_DATA.forEach(checkIfDefaultIsPresent)
      })
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    beforeEach(() => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAdditionalBusinessStatusesByLocation')) {
          aliasQuery(req, 'GetAdditionalBusinessStatusesByLocation')
          successResponse(req, GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE)
        }
      })

      // We need to set the current location before the widget is rendered

      const store = getStore()

      store.dispatch(setCurrentLocation(GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations[0]))

      cy.mountWithProviders(<StatusDataSection isAdditionalBusinessStatus mode={BusinessStatusMode.ByLocation} />, {
        reduxStore: store,
      })

      cy.wait('@gqlGetAdditionalBusinessStatusesByLocationQuery')
    })

    describe('renders correctly', () => {
      it('renders the highlighted slots column when isAdditionalBusinessStatus is true', () => {
        cy.get(ROW).each((row, index) => {
          // Highlight column
          const highlightCell = cy.wrap(row).find(CELL).eq(ADDITIONAL_STATUSES_COLUMN_INDEXES.HIGHLIGHT)

          if (ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_DATA[index]?.isHighlighted) {
            highlightCell.find('i').should('exist')
          }

          if (!ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_DATA[index]?.isHighlighted) {
            highlightCell.should('be.empty').and('match', ':empty')
          }
        })
      })
    })

    describe('delete functionality', () => {
      it('should not render delete button when status is default', () => {
        cy.get(ROW).each((row, index) => {
          const additionalBusinessStatus = ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_DATA[index]
          const deleteButton = cy
            .wrap(row)
            .find(CELL)
            .eq(ADDITIONAL_STATUSES_COLUMN_INDEXES.DELETE_BUTTON)
            .find('button')

          if (additionalBusinessStatus?.isDefault) {
            deleteButton.should('not.exist')
          }
          if (!additionalBusinessStatus?.isDefault) {
            deleteButton.should('exist')
          }
        })
      })

      it('executes useUnassignAdditionalBusinessStatusFromLocationMutation when delete button is clicked', () => {
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'UnassignAdditionalBusinessStatusFromLocation')) {
            aliasMutation(req, 'UnassignAdditionalBusinessStatusFromLocation')

            const firstNonDefaultRow = ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_DATA.find(
              (businessStatus) => !businessStatus.isDefault,
            )
            expect(req.body.variables.businessStatusId).to.deep.equal(firstNonDefaultRow?.id)

            successResponse(req, UNASSIGN_ADDITIONAL_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE)
          }
        })

        const findFirstRowWithNonDefaultStatus = () => {
          return cy.get(ROW).then((rows) => {
            return rows.toArray().find((_, index) => {
              return !ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_DATA[index].isDefault
            })
          })
        }

        const deleteButton = findFirstRowWithNonDefaultStatus()
          .find(CELL)
          .eq(ADDITIONAL_STATUSES_COLUMN_INDEXES.DELETE_BUTTON)
          .find('button')
        deleteButton.click()

        cy.wait('@gqlUnassignAdditionalBusinessStatusFromLocationMutation')
      })
    })
  })
})
