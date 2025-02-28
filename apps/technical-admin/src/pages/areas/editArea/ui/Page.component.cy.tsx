import {
  GET_AREA_OPERATION_DEFAULT_RESPONSE,
  GET_COUNTRIES_DEFAULT_RESPONSE,
  UPDATE_AREA_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import EditAreaPage from './Page'

describe('EditAreaPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetArea')) {
        aliasQuery(req, 'GetArea')
        successResponse(req, GET_AREA_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCountries')) {
        aliasQuery(req, 'GetCountries')
        successResponse(req, GET_COUNTRIES_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<EditAreaPage />)
    cy.wait('@gqlGetAreaQuery')
    cy.wait('@gqlGetCountriesQuery')
  })

  it.only('renders the form with default fields and checks default values', () => {
    cy.wait(3000)

    cy.get('input[name="code"]')
      .should('be.visible')
      .should('have.value', GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea.code)
    cy.get('input[name="name"]').should('be.visible').should('have.value', GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea.name)
    cy.get('input[name="address.country.id"]').should('be.visible').should('have.value', GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea.address.country.id)
    cy.get('input[name="address.postCode"]').should('be.visible').should('have.value', GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea.address.postCode)
    cy.get('input[name="address.city"]').should('be.visible').should('have.value', GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea.address.city)
    cy.get('input[name="address.address"]').should('be.visible').should('have.value', GET_AREA_OPERATION_DEFAULT_RESPONSE.getArea.address.address)
  })

  it('submits the form with valid data', () => {
    const areaId = '1'
    cy.mountWithProviders(<EditAreaPage />, {
      initialRouteEntries: [`/areas/${areaId}/edit`],
      route: '/areas/:id/edit',
    })

    cy.get('input[name="code"]').type('007')

    // type in the area name
    cy.get('input[name="name"]').type('Test Area')

    // select area country
    cy.get('input[name="address.country.id"]').type('Germany')
    cy.get('[data-pc-name="autocomplete"]').click()
    cy.get('[data-pc-section="item"]:contains("Germany")').click()

    // type in the area postal code
    cy.get('input[name="address.postCode"]').type('10115')

    // type in the area city
    cy.get('input[name="address.city"]').type('Berlin')

    // type in the area address
    cy.get('input[name="address.address"]').type('Friedrichstrasse 100')

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateArea')) {
        aliasMutation(req, 'UpdateArea')

        expect(req.body.variables.area).to.deep.equal({
          name: 'Test Area',
          code: '007',
          address: {
            country: {
              id: GET_COUNTRIES_DEFAULT_RESPONSE.getCountries.countries[0].id,
            },
            postCode: '10115',
            city: 'Berlin',
            address: 'Friedrichstrasse 100',
          },
          id: '',
        })

        successResponse(req, {
          brands: UPDATE_AREA_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })
  })

  it('Displays error message when form is submitted with invalid data', () => {
    cy.mountWithProviders(<EditAreaPage />)

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.contains('This field is required').should('be.visible')
    // cy.contains('Required').should('be.visible')
  })
})