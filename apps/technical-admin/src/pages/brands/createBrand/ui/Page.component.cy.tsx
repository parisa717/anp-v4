import { CREATE_BRAND_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'

import { pageUrls } from '@/shared/lib'

import CreateBrandPage from './Page'

describe('CreateBrandPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasMutation(req, 'CreateBrand')
    })
  })

  it('renders the page', () => {
    cy.mountWithProviders(<CreateBrandPage />)
  })

  it('submits the form', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateBrand')) {
        aliasMutation(req, 'CreateBrand')
        successResponse(req, {
          brands: CREATE_BRAND_OPERATION_DEFAULT_RESPONSE,
        })
      }
    })

    cy.mountWithProviders(<CreateBrandPage />)

    // type in "Test Brand" in the brand name text input
    cy.get('input[name="name"]').type('Test Brand')

    // select "Active" in the brand status dropdown
    cy.get('[data-pc-name="dropdown"]').click()
    cy.get('[data-pc-section="item"]:contains("Active")').click()

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.wait('@gqlCreateBrandMutation')

    cy.url().should('include', pageUrls.brands.root())
  })

  it('cancels the form', () => {
    cy.mountWithProviders(<CreateBrandPage />)
    cy.get('[data-pc-section="label"]:contains("cancel")').click()
    cy.url().should('include', pageUrls.brands.root())
  })

  it('Displays error message when form is submitted with invalid data', () => {
    cy.mountWithProviders(<CreateBrandPage />)

    // click "Save" button
    cy.get('button[aria-label="save"]').click()

    cy.contains('This field is required').should('be.visible')
  })
})
