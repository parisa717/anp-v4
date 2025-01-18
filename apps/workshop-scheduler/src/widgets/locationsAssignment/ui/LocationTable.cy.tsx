import { GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { COMMON_TEST_SELECTORS } from '@nexus-ui/utils'
import { useState } from 'react'

import { SelectedLocationEntity } from '../model/types'
import { LocationTable } from './LocationTable'

const { CELL, ROW, ROWS_PER_PAGE_25, ROWS_PER_PAGE_50, ROWS_PER_PAGE_DROPDOWN, SORT_BUTTON } = COMMON_TEST_SELECTORS

const WORK = {
  id: 'work-id',
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
  ...location,
  isSelected: false,
  isRecommended: false,
  brandIds: ['brand_1'],
  brands: location.brands.map(({ id, code }) => ({ id, code })),
}))

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
    const TestComponent = () => {
      const [selectedLocations, setSelectedLocations] = useState<SelectedLocationEntity[]>([])

      const handleChange = (locations: SelectedLocationEntity[]) => {
        setSelectedLocations(locations)
      }

      return (
        <LocationTable
          isLoadingLocations={false}
          locations={LOCATIONS}
          work={WORK}
          selectedLocations={selectedLocations}
          onChange={handleChange}
        />
      )
    }

    cy.mountWithProviders(<TestComponent />)
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
    cy.get(ITEM).contains('Opel', { matchCase: false }).click()
    cy.get(ROW).should('have.length', 1)

    cy.get(DROPDOWN).click()
    cy.get(ITEM).contains('Opel', { matchCase: false }).click()
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
    cy.mountWithProviders(
      <LocationTable
        isLoadingLocations={false}
        locations={[]}
        work={WORK}
        selectedLocations={[]}
        onChange={cy.stub()}
      />,
    )
    cy.contains('No locations found').should('be.visible')
  })

  it('changes items per page to 25 and 50', () => {
    const multipliedLocations = Array(25).fill(LOCATIONS).flat()

    cy.mountWithProviders(
      <LocationTable
        isLoadingLocations={false}
        locations={multipliedLocations}
        work={WORK}
        selectedLocations={[]}
        onChange={cy.stub()}
      />,
    )

    cy.get(ROW).should('have.length', 10)

    cy.get(ROWS_PER_PAGE_DROPDOWN).click()
    cy.get(ROWS_PER_PAGE_25).click()

    cy.get(ROW).should('have.length', 25)

    cy.get(ROWS_PER_PAGE_DROPDOWN).click()
    cy.get(ROWS_PER_PAGE_50).click()

    cy.get(ROW).should('have.length', 50)
  })

  it('works with sorting when changing items per page', () => {
    const multipliedLocations = Array(10).fill(LOCATIONS).flat()

    cy.mountWithProviders(
      <LocationTable
        isLoadingLocations={false}
        locations={multipliedLocations}
        work={WORK}
        selectedLocations={[]}
        onChange={cy.stub()}
      />,
    )

    cy.get(SORT_BUTTON).eq(0).click()

    cy.get(ROWS_PER_PAGE_DROPDOWN).click()
    cy.get(ROWS_PER_PAGE_25).click()

    cy.get(ROW).first().find(CELL).eq(1).should('have.text', '001')
    cy.get(ROW).last().find(CELL).eq(1).should('have.text', '011')
  })

  it('works with filtering when changing items per page', () => {
    const multipliedLocations = Array(10).fill(LOCATIONS).flat()

    cy.mountWithProviders(
      <LocationTable
        isLoadingLocations={false}
        locations={multipliedLocations}
        work={WORK}
        selectedLocations={[]}
        onChange={cy.stub()}
      />,
    )

    cy.get(DROPDOWN).click()
    cy.get('[data-pc-section="list"]').contains('Opel', { matchCase: false }).click()

    cy.get(ROWS_PER_PAGE_DROPDOWN).click()
    cy.get(ROWS_PER_PAGE_25).click()

    cy.get(ROW).first().find(CELL).eq(3).should('have.text', 'Kia')
    cy.get(ROW).last().find(CELL).eq(3).should('have.text', 'Kia')
  })
})
