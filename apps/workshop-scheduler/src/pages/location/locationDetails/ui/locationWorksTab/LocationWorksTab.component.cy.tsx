import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE, GET_LOCATION_WORKS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { ListLocationWorkItemEntity } from '@/entities/locationWork'

import { LocationWorksTab } from './LocationWorksTab'

const sortTableByChecked = (colIndex: number, sortIndex: number, base: boolean[], sorted: boolean[]) => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get('[data-pc-section="bodyrow"]')
    .first()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .find('input[type="checkbox"]')
    .should(firstBase ? 'be.checked' : 'not.be.checked')
  cy.get('[data-pc-section="bodyrow"]')
    .last()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .find('input[type="checkbox"]')
    .should(lastBase ? 'be.checked' : 'not.be.checked')

  // Ascending
  cy.get('[data-pc-section="sort"]').eq(sortIndex).click()
  cy.get('[data-pc-section="bodyrow"]')
    .first()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .find('input[type="checkbox"]')
    .should(firstSorted ? 'be.checked' : 'not.be.checked')
  cy.get('[data-pc-section="bodyrow"]')
    .last()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .find('input[type="checkbox"]')
    .should(lastSorted ? 'be.checked' : 'not.be.checked')

  // Descending
  cy.get('[data-pc-section="sort"]').eq(sortIndex).click()
  cy.get('[data-pc-section="bodyrow"]')
    .first()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .find('input[type="checkbox"]')
    .should(lastSorted ? 'be.checked' : 'not.be.checked')
  cy.get('[data-pc-section="bodyrow"]')
    .last()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .find('input[type="checkbox"]')
    .should(firstSorted ? 'be.checked' : 'not.be.checked')

  // Back to default
  cy.get('[data-pc-section="sort"]').eq(sortIndex).click()
}

const sortTable = (colIndex: number, sortIndex: number, base: string[], sorted: string[]) => {
  const [firstBase, lastBase] = base
  const [firstSorted, lastSorted] = sorted

  // Default
  cy.get('[data-pc-section="bodyrow"]')
    .first()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .should('have.text', firstBase)
  cy.get('[data-pc-section="bodyrow"]')
    .last()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .should('have.text', lastBase)

  // Ascending
  cy.get('[data-pc-section="sort"]').eq(sortIndex).click()
  cy.get('[data-pc-section="bodyrow"]')
    .first()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .should('have.text', firstSorted)
  cy.get('[data-pc-section="bodyrow"]')
    .last()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .should('have.text', lastSorted)

  // Descending
  cy.get('[data-pc-section="sort"]').eq(sortIndex).click()
  cy.get('[data-pc-section="bodyrow"]')
    .first()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .should('have.text', lastSorted)
  cy.get('[data-pc-section="bodyrow"]')
    .last()
    .find('[data-pc-section="bodycell"]')
    .eq(colIndex)
    .should('have.text', firstSorted)

  // Back to default
  cy.get('[data-pc-section="sort"]').eq(sortIndex).click()
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

const filterTableByDropdown = ({
  colIndex,
  query,
  lengthBeforeQuery,
  lengthAfterQuery,
}: {
  colIndex: number
  query: string
  lengthBeforeQuery: number
  lengthAfterQuery: number
}) => {
  cy.get('[data-pc-section="bodyrow"]').should('have.length', lengthBeforeQuery)

  cy.get('[data-pc-name="multiselect"]').eq(colIndex).realClick()
  cy.get('[data-pc-section="item"]').contains(query, { matchCase: false }).realClick()
  cy.get('[data-pc-section="bodyrow"]').should('have.length', lengthAfterQuery)

  cy.get('[data-pc-name="multiselect"]').find('[data-pc-section="clearicon"]').realClick()
  cy.get('[data-pc-section="bodyrow"]').should('have.length', lengthBeforeQuery)
}

const filterTableBySearch = ({
  colIndex,
  query,
  lengthBeforeQuery,
  lengthAfterQuery,
}: {
  colIndex: number
  query: string
  lengthBeforeQuery: number
  lengthAfterQuery: number
}) => {
  cy.get('[data-pc-section="bodyrow"]').should('have.length', lengthBeforeQuery)

  cy.get('[data-cy="search-input"]').eq(colIndex).focus().realType(query)
  cy.get('[data-pc-section="bodyrow"]').should('have.length', lengthAfterQuery)

  cy.get('[data-cy="search-input"]').eq(colIndex).focus().clear()
  cy.get('[data-pc-section="bodyrow"]').should('have.length', lengthBeforeQuery)
}

const locationWorks = GET_LOCATION_WORKS_DEFAULT_RESPONSE.getLocationWorks.locationWorks

describe('LocationWorksTab component', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationWorks')) {
        aliasQuery(req, 'GetLocationWorks')
        successResponse(req, GET_LOCATION_WORKS_DEFAULT_RESPONSE)
      }
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<LocationWorksTab />)
    cy.wait('@gqlGetLocationWorksQuery')
    cy.wait('@gqlGetBrandsQuery')
  })

  it('renders the connected locations table with correct data', () => {
    const getLocationWorkFields = (work: ListLocationWorkItemEntity) => [
      work.name,
      work.brands.map((brand) => brand?.name).join(''),
      work.brands.reduce((accumulator, currentValue) => accumulator + (currentValue?.timeUnits ?? 0), 0),
      work.qualification.name,
      '',
      work.amountPerDayLimit,
      '',
    ]

    GET_LOCATION_WORKS_DEFAULT_RESPONSE.getLocationWorks.locationWorks.forEach((work, index) => {
      getLocationWorkFields(work).forEach((field, fieldIndex) => {
        cy.get('[data-pc-section="bodyrow"]')
          .eq(index)
          .find('[data-pc-section="bodycell"]')
          .eq(fieldIndex)
          .should('contain.text', field)
      })
    })
  })

  it('renders empty message when locations array is empty', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationWorks')) {
        aliasQuery(req, 'GetLocationWorks')
        successResponse(req, { getLocationWorks: { locationWorks: [] } })
      }
    })

    cy.mountWithProviders(<LocationWorksTab />)
    cy.wait('@gqlGetLocationWorksQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.contains('No services found').should('be.visible')
  })

  it('does not render table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationWorks')) {
        aliasQuery(req, 'GetLocationWorks')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<LocationWorksTab />)
    cy.wait('@gqlGetLocationWorksQuery')

    cy.contains('Error').should('be.visible')
  })

  it('filters the table on filterable fields', () => {
    cy.mountWithProviders(<LocationWorksTab />)
    cy.wait('@gqlGetLocationWorksQuery')

    const OPEL_BRAND = 'Opel'
    const locationWorksWithOpelBrand = locationWorks.filter((work) =>
      work.brands.some((brand) => brand.name === OPEL_BRAND),
    )

    filterTableBySearch({
      colIndex: 0,
      query: locationWorks[0].name,
      lengthBeforeQuery: locationWorks.length,
      lengthAfterQuery: 1,
    })
    filterTableByDropdown({
      colIndex: 0,
      query: OPEL_BRAND,
      lengthBeforeQuery: locationWorks.length,
      lengthAfterQuery: locationWorksWithOpelBrand.length,
    })
    filterTableBySearch({
      colIndex: 1,
      query: locationWorks[0].qualification.name,
      lengthBeforeQuery: locationWorks.length,
      lengthAfterQuery: 3,
    })
    filterTableByCheckedStatusDropdown({
      dropdownIndex: 0,
      defaultLength: locationWorks.length,
      checkedStatusLength: 3,
      uncheckedStatusLength: 2,
    })
  })

  it('sorts the table on sortable fields', () => {
    sortTable(
      0,
      0,
      [locationWorks[0].name, locationWorks[locationWorks.length - 1].name],
      [locationWorks[0].name, locationWorks[locationWorks.length - 1].name],
    )
    sortTable(
      3,
      1,
      [locationWorks[0].qualification.name, locationWorks[locationWorks.length - 1].qualification.name],
      [locationWorks[2].qualification.name, locationWorks[3].qualification.name],
    )
    sortTableByChecked(
      4,
      2,
      [locationWorks[0].isRecommended, locationWorks[locationWorks.length - 1].isRecommended],
      [locationWorks[2].isRecommended, locationWorks[0].isRecommended],
    )
  })

  it('should fire the update request when checkbox is clicked', () => {
    const {
      isCapacityEditable: _,
      isDescriptionEditable: __,
      name: ___,
      qualification: ____,
      ...expectedPayload
    } = locationWorks[0]

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationWork')) {
        aliasMutation(req, 'UpdateLocationWork')

        expect(req.body.variables.locationWork).to.deep.equal({
          ...expectedPayload,
          brands: expectedPayload.brands.map((brand) => ({ id: brand.id })),
          isRecommended: !expectedPayload.isRecommended,
        })

        successResponse(req, {
          updateLocationWork: {
            status: true,
          },
        })
      }
    })

    cy.get('[data-pc-section="bodyrow"]')
      .first()
      .find('[data-pc-section="bodycell"]')
      .eq(4)
      .find('input[type="checkbox"]')
      .click()

    cy.wait('@gqlUpdateLocationWorkMutation')
  })
})
