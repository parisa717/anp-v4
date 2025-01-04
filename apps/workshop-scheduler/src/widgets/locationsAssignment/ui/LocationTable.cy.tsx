import { GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'
import { useState } from 'react'

import { SelectedLocationEntity } from '../model/types'
import { LocationTable } from './LocationTable'

const WORK = {
  name: 'Work 1',
  qualificationId: 'qual-123',
  isActive: true,
  isDescriptionEditable: false,
  isCapacityEditable: true,
  brands: [
    {
      id: 'brand_1',
      timeUnits: '24',
    },
    {
      id: 'brand_2',
      timeUnits: 48,
    },
  ],
}

const LOCATIONS = GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations.map((location) => ({
  isSelected: false,
  isRecommended: false,
  brandIds: ['brand_1'],
  ...location,
}))

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'
const SORT = '[data-pc-section="sort"]'
const DROPDOWN = '[data-pc-name="multiselect"]'
const INPUT = '[data-pc-section="input"]'
const IS_RECOMMENDED_CHECKBOX = '[data-cy="isRecommended-checkbox"]'
const BRAND_CHECKBOX = '[data-cy="brand-checkbox"]'
const IS_SELECTED_CHECKBOX = '[data-cy="isSelected-checkbox"]'

const sortTable = (colIndex: number, base: [string, string], sorted: [string, string]): void => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstBase)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastBase)

  // Ascending
  cy.get(SORT)
    .eq(colIndex - 1)
    .click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', firstSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', lastSorted)

  // Descending
  cy.get(SORT)
    .eq(colIndex - 1)
    .click()
  cy.get(ROW).first().find(CELL).eq(colIndex).should('have.text', lastSorted)
  cy.get(ROW).last().find(CELL).eq(colIndex).should('have.text', firstSorted)

  // Back to default
  cy.get(SORT)
    .eq(colIndex - 1)
    .click()
}

describe('LocationTable', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    const TestComponent = () => {
      const [selectedLocations, setSelectedLocations] = useState<SelectedLocationEntity[]>([])

      const handleChange = (locations: SelectedLocationEntity[]) => {
        setSelectedLocations(locations)
      }

      return <LocationTable work={WORK} selectedLocations={selectedLocations} onChange={handleChange} />
    }

    cy.mountWithProviders(<TestComponent />)
    cy.wait('@gqlGetLocationsQuery')
  })

  it('renders the table with locations', () => {
    LOCATIONS.forEach((location, index) => {
      cy.get(ROW).eq(index).find(CELL).eq(1).should('contain.text', location.code)
      cy.get(ROW).eq(index).find(CELL).eq(2).should('contain.text', location.name)
      cy.get(ROW)
        .eq(index)
        .find(CELL)
        .eq(3)
        .should('contain.text', location.brands.map((b) => b.code).join(''))
      cy.get(ROW).eq(index).find(CELL).eq(4).should('contain.text', 'Set the service as popular')
    })
  })

  it('sorts the table on sortable fields', () => {
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
  })

  it('filters the table by dropdown selection', () => {
    const ITEM = '[data-pc-section="list"]'

    cy.get(ROW).should('have.length', LOCATIONS.length)

    cy.get(DROPDOWN).click()
    cy.get(ITEM).contains('Kia', { matchCase: false }).click()
    cy.get(ROW).should('have.length', 1)

    cy.get(DROPDOWN).find('[data-pc-section="clearicon"]').click()
    cy.get(ROW).should('have.length', 4)
  })

  it('selects all locations together with their brands', () => {
    cy.get('[data-pc-name="checkbox"]').first().click()

    cy.get(IS_SELECTED_CHECKBOX)
      .should('have.length', 4)
      .each((checkbox) => {
        cy.wrap(checkbox).get(INPUT).should('be.checked')
      })

    cy.get(BRAND_CHECKBOX)
      .should('have.length', 5)
      .each((checkbox) => {
        cy.wrap(checkbox).get(INPUT).should('be.checked')
      })
  })

  it("selects location when it's brand is selected", () => {
    cy.get(BRAND_CHECKBOX).first().click()

    cy.get(IS_SELECTED_CHECKBOX).first().get(INPUT).should('be.checked')
  })

  it("selects location when it's isRecommended is selected", () => {
    cy.get(IS_RECOMMENDED_CHECKBOX).first().click()

    cy.get(IS_SELECTED_CHECKBOX).first().get(INPUT).should('be.checked')
  })

  it("doesn't uncheck brand when there is only one selected", () => {
    cy.get(IS_SELECTED_CHECKBOX).first().click()

    cy.get(BRAND_CHECKBOX).eq(0).click()
    cy.get(BRAND_CHECKBOX).eq(1).click()

    cy.get(BRAND_CHECKBOX).eq(0).find(INPUT).should('not.be.checked')
    cy.get(BRAND_CHECKBOX).eq(1).find(INPUT).should('be.checked')
  })

  it('renders an empty message when there are no locations', () => {
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

    cy.mountWithProviders(<LocationTable work={WORK} selectedLocations={[]} onChange={cy.stub()} />)
    cy.wait('@gqlGetLocationsQuery')

    cy.contains('No locations found').should('be.visible')
  })

  it('renders error state when query fails', () => {
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

    cy.mountWithProviders(<LocationTable work={WORK} selectedLocations={[]} onChange={cy.stub()} />)
    cy.wait('@gqlGetLocationsQuery')

    cy.contains('Error').should('be.visible')
  })
})
