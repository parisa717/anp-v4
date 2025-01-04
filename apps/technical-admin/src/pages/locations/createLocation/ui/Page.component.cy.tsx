import {
  CREATE_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_AREAS_OPERATION_DEFAULT_RESPONSE,
  GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
  GET_COUNTRIES_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { pageUrls } from '@/shared/lib'

import CreateLocationPage from './Page'

describe('CreateLocationPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAreas')) {
        aliasQuery(req, 'GetAreas')

        successResponse(req, GET_AREAS_OPERATION_DEFAULT_RESPONSE)
      }

      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')

        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
      }

      if (hasOperationName(req, 'GetCountries')) {
        aliasQuery(req, 'GetCountries')

        successResponse(req, GET_COUNTRIES_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')
    cy.wait('@gqlGetCountriesQuery')
  })

  it('renders the page', () => {
    cy.contains('Add Location').should('be.visible')
    cy.get('#area').should('be.visible')
    cy.get('#copyNameFromArea').parent().should('be.visible')
    cy.get('#copyNameFromArea').should('be.disabled')
    cy.contains('label', 'Copy name from Area').should('be.visible')
    cy.get('input[name="code"]').should('be.visible')
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="zipCode"]').should('be.visible')
    cy.get('input[name="city"]').should('be.visible')
    cy.get('input[name="address"]').should('be.visible')
    cy.get('#country').should('be.visible')
    cy.get('#brands\\.0\\.id').should('be.visible')
    cy.contains('Add brand').should('be.visible')
    cy.get('#isActive').should('be.visible')

    cy.get('button[aria-label="save"]').should('be.visible')
    cy.get('button[aria-label="cancel"]').should('be.visible')
  })

  it('submits the form with valid data', () => {
    cy.mountWithProviders(<CreateLocationPage />)

    cy.wait('@gqlGetAreasQuery')
    cy.wait('@gqlGetBrandsQuery')

    cy.get('[data-pc-name="dropdown"]').first().click()
    cy.get(
      `[data-pc-section="item"]:contains(${GET_AREAS_OPERATION_DEFAULT_RESPONSE.getAreas.areas?.[0]?.name})`,
    ).click()
    cy.get('input[name="code"]').type('LOC001')
    cy.get('input[name="name"]').type('Test Location')
    cy.get('input[name="zipCode"]').type('12345')
    cy.get('input[name="city"]').type('Test City')
    cy.get('input[name="address"]').type('123 Test St')
    cy.get('#country').click()
    cy.contains('Austria').click()
    cy.get('#brands\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.get('#isActive').click()
    cy.contains('inactive').click()

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateLocation')) {
        aliasMutation(req, 'CreateLocation')

        expect(req.body.variables.location).to.deep.equal({
          area: {
            id: GET_AREAS_OPERATION_DEFAULT_RESPONSE.getAreas.areas?.[0]?.id,
          },
          code: '001',
          name: 'Test Location',
          zipCode: '12345',
          city: 'Test City',
          address: {
            address: '123 Test St',
            city: 'Test City',
            country: {
              id: '2',
            },
            postCode: '12345',
          },
          country: '2',
          brands: [
            {
              id: 'brand_1',
            },
          ],
          isActive: false,
        })

        successResponse(req, {
          createLocation: CREATE_LOCATION_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    cy.get('button[aria-label="save"]').click()

    cy.wait('@gqlCreateLocationMutation')
  })

  it('displays error messages for invalid form submission', () => {
    cy.get('button[aria-label="save"]').click()

    cy.get('.text-error').should('have.length', 8)
  })

  it('copies name from area when checkbox is checked', () => {
    cy.get('#copyNameFromArea').should('be.disabled')
    cy.get('[data-pc-name="dropdown"]').first().click()
    cy.get(
      `[data-pc-section="item"]:contains(${GET_AREAS_OPERATION_DEFAULT_RESPONSE.getAreas.areas?.[0]?.name})`,
    ).click()
    cy.get('#copyNameFromArea').should('be.enabled')
    cy.get('#copyNameFromArea').click()
    cy.get('input[name="name"]').should('have.value', GET_AREAS_OPERATION_DEFAULT_RESPONSE.getAreas.areas?.[0]?.name)
  })

  it('allows adding multiple brands', () => {
    cy.get('#brands\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.contains('Add brand').click()
    cy.get('#brands\\.1\\.id').click()
    cy.contains('Nissan').click()
  })

  it('cancels the form', () => {
    cy.get('[data-pc-section="label"]:contains("cancel")').click()
    cy.url().should('include', pageUrls.locations.root())
  })
})
