import { GET_COUNTRIES_DEFAULT_RESPONSE, UPDATE_AREA_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import EditAreaPage from './Page'

describe('EditAreaPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetCountries')) {
        aliasQuery(req, 'GetCountries')
        successResponse(req, GET_COUNTRIES_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<EditAreaPage />)
    cy.wait('@gqlGetCountriesQuery')
  })

  it('submits the form', () => {
    // type in area id
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

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.wait('@gqlUpdateAreaMutation')
  })

  it('Displays error message when form is submitted with invalid data', () => {
    cy.mountWithProviders(<EditAreaPage />)

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.contains('Required').should('be.visible')
  })
})
