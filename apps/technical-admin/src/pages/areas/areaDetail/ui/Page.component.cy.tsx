import { GET_AREA_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { GqlAreaObjectTypeEntity } from '@/entities/area'

import AreaDetailPage from './Page'

const AREA_TABLE = '[data-cy="area-table"]'
const CELL = '[data-pc-section="bodycell"]'

const AREA_DATA = GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea

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

    cy.mountWithProviders(<AreaDetailPage />)
    cy.wait('@gqlGetAreaQuery')
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
