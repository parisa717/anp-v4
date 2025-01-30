import { GET_AREA_OPERATION_DEFAULT_RESPONSE ,GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE} from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { GqlAreaObjectTypeEntity } from '@/entities/area'
import { LocationEntity } from '@/entities/location'

import AreaDetailPage from './Page'

const AREA_TABLE = '[data-cy="area-table"]'
const CELL = '[data-pc-section="bodycell"]'
const ROW = '[data-pc-section="bodyrow"]'

const AREA_DATA = GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea
const LOCATIONS = GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations
const verifyTableRendering = (tableSelector: string, columnsData: string[]) => {
  cy.get(tableSelector)
    .find(CELL)
    .each((cell, index) => {
      cy.wrap(cell).should('contain.text', columnsData[index])
    })
}

describe('AreaDetailsPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, GET_AREA_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')
    cy.wait('@qqlGetLocationsQuery')
  })

  it('renders the Area table correctly', () => {
    const getAreaFields = (area: GqlAreaObjectTypeEntity) => [
      area?.code ?? '',
      area?.name ?? '',
      area?.address.country.name ?? '',
      area?.address.postCode ?? '',
      area?.address.city ?? '',
      area?.address.address ?? '',

      area?.isActive ? 'active' : 'inactive',
    ]
    verifyTableRendering(AREA_TABLE, getAreaFields(AREA_DATA))
  })
  it('renders an empty message when no area data is available', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, { getArea: null })
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')
    cy.contains('No area details found').should('be.visible')
  })
 it('renders the table with locations', () => {
    const getLocationFields = (location: LocationEntity) => [
      location.area.id,
      location.code,
      location.name,
      location.brands.map((b) => b.code).join(''),
      location.address.postCode,
      location.address.city,
      location.address.address,
      location.isActive ? 'active' : 'inactive',
    ]

    LOCATIONS?.forEach((location, locationIndex) => {
      getLocationFields(location).forEach((field, fieldIndex) => {
        console.log(field)
        cy.get(ROW).eq(locationIndex).find(CELL).eq(fieldIndex).should('contain.text', field)
      })
    })
  })
  it('does not render table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')

    cy.contains('Error').should('be.visible')
  })
})
