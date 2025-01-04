import { GET_BRAND_OPERATION_DEFAULT_RESPONSE, UPDATE_BRAND_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import EditBrandPage from './Page'

describe('EditBrandPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateBrand')) {
        aliasMutation(req, 'UpdateBrand')
        successResponse(req, {
          updateBrands: UPDATE_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }

      if (hasOperationName(req, 'GetBrand')) {
        aliasQuery(req, 'GetBrand')
        successResponse(req, GET_BRAND_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<EditBrandPage />, {
      initialRouteEntries: ['/edit-brand/mocked_brand_1'],
      route: '/edit-brand/:id',
    })

    cy.wait('@gqlGetBrandQuery')
  })

  it('submits the form', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateBrand')) {
        aliasMutation(req, 'UpdateBrand')

        // check if the request payload is correct
        expect(req.body.variables).to.deep.equal({
          brand: {
            id: GET_BRAND_OPERATION_DEFAULT_RESPONSE.getBrand?.id,
            code: 'Kia updated name',
          },
        })

        successResponse(req, {
          updateBrands: UPDATE_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    // type in "Kia updated name" in the brand name text input
    cy.get('input[name="name"]').clear().type('Kia updated name')

    // click "Save" & "Confirm" buttons
    cy.get('button[aria-label="save"]').click()
    cy.get('button[aria-label="confirm"]').click()

    cy.wait('@gqlUpdateBrandMutation')
  })

  it('Displays error message when form is submitted with invalid data', () => {
    cy.get('input[name="name"]').clear()

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.contains('This field is required').should('be.visible')
  })
})
