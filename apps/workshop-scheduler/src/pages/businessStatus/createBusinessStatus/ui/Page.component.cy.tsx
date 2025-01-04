import {
  CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
  CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE,
  CREATE_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_ERROR_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, COMMON_TEST_SELECTORS, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import CreateBusinessStatusPage from './Page'

describe('CreateBusinessStatusPage', () => {
  describe('isAdditionalBusinessStatus is false', () => {
    it('renders the page', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Add appointment status').should('be.visible')
      cy.get('#businessStatuses\\.0\\.name').should('be.visible')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().should('be.visible')
      cy.contains('label', 'Define as default').should('be.visible')

      cy.contains('Add status').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')
      cy.get('[data-pc-name="dropdown"]').eq(1).click()
      cy.get('[data-pc-section="item"]:contains("Inactive")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateBusinessStatuses')) {
          aliasMutation(req, 'CreateBusinessStatuses')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              name: 'Test business status',
              isDefault: true,
              isActive: true,
            },
            {
              name: 'Test business status 2',
              isDefault: false,
              isActive: false,
            },
          ])

          successResponse(
            req,
            CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE([
              '56d50e57-2156-4716-bafb-e49ac6d8fbd5',
              'b2f75cac-931a-4a5a-9cad-c73c6b60ffd2',
            ]),
          )
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateBusinessStatusesMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Add status').click()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 2)
    })

    it('displays feature-specific server-side error', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />, {
        initialRouteEntries: ['/business-status/create'],
        route: '/business-status/create',
      })

      cy.get('#businessStatuses\\.0\\.name').type('Status 1')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateBusinessStatuses')) {
          aliasMutation(req, 'CreateBusinessStatuses')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              name: 'Status 1',
              isDefault: false,
              isActive: true,
            },
          ])

          errorResponse(req, CREATE_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()
      cy.wait('@gqlCreateBusinessStatusesMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Business status already exists')
    })

    it('removes entry when remove button is clicked', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')

      cy.get('.pi-trash').first().click()

      cy.get('#businessStatuses\\.1\\.name').should('not.exist')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateBusinessStatuses')) {
          aliasMutation(req, 'CreateBusinessStatuses')

          expect(req.body.variables.businessStatuses).to.deep.equal([
            {
              name: 'Test business status 2',
              isDefault: false,
              isActive: true,
            },
          ])

          successResponse(
            req,
            CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE(['6226f966-bee4-47d6-83b7-084065798038']),
          )
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateBusinessStatusesMutation')
    })

    it('updates isDefault to false on all other entries when the isDefault is checked for one of the entries', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus={false} />)

      cy.contains('Add status').click()

      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').should('not.be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('not.be.checked')
      cy.get('input[name="businessStatuses.1.isDefault"]').should('be.checked')
    })
  })

  describe('isAdditionalBusinessStatus is true', () => {
    it('renders the page', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Add appointment status').should('be.visible')
      cy.get('#businessStatuses\\.0\\.name').should('be.visible')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().should('be.visible')
      cy.contains('label', 'Define as default').should('be.visible')
      cy.contains('label', 'Highlighted in slots').should('be.visible')
      cy.get('input[name="businessStatuses.0.isHighlighted"]').parent().should('be.visible')

      cy.contains('Add status').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('submits the form with valid data', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')
      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()
      cy.get('input[name="businessStatuses.0.isHighlighted"]').parent().click()

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')
      cy.get('[data-pc-name="dropdown"]').eq(1).click()
      cy.get('[data-pc-section="item"]:contains("Inactive")').click()

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateAdditionalBusinessStatuses')) {
          aliasMutation(req, 'CreateAdditionalBusinessStatuses')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              name: 'Test business status',
              isDefault: true,
              isActive: true,
              isHighlighted: true,
            },
            {
              name: 'Test business status 2',
              isDefault: false,
              isActive: false,
              isHighlighted: false,
            },
          ])

          successResponse(req, CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateAdditionalBusinessStatusesMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Add status').click()

      cy.get('button[aria-label="save"]').click()

      cy.get('.text-error').should('have.length', 2)
    })

    it('displays feature-specific server-side error', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />, {
        initialRouteEntries: ['/business-status/create-additional'],
        route: '/business-status/create-additional',
      })

      cy.get('#businessStatuses\\.0\\.name').type('Status 1')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateAdditionalBusinessStatuses')) {
          aliasMutation(req, 'CreateAdditionalBusinessStatuses')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              name: 'Status 1',
              isDefault: false,
              isActive: true,
              isHighlighted: false,
            },
          ])

          errorResponse(req, CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_ERROR_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()
      cy.wait('@gqlCreateAdditionalBusinessStatusesMutation')

      cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Additional business status already exists')
    })

    it('removes entry when remove button is clicked', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.get('#businessStatuses\\.0\\.name').type('Test business status')

      cy.contains('Add status').click()

      cy.get('#businessStatuses\\.1\\.name').type('Test business status 2')

      cy.get('.pi-trash').first().click()

      cy.get('#businessStatuses\\.1\\.name').should('not.exist')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'CreateAdditionalBusinessStatuses')) {
          aliasMutation(req, 'CreateAdditionalBusinessStatuses')

          expect(req.body.variables.additionalBusinessStatuses).to.deep.equal([
            {
              name: 'Test business status 2',
              isDefault: false,
              isHighlighted: false,
              isActive: true,
            },
          ])

          successResponse(req, CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlCreateAdditionalBusinessStatusesMutation')
    })

    it('updates isDefault to false on all other entries when the isDefault is checked for one of the entries', () => {
      cy.mountWithProviders(<CreateBusinessStatusPage isAdditionalBusinessStatus />)

      cy.contains('Add status').click()

      cy.get('input[name="businessStatuses.0.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').should('not.be.checked')

      cy.get('input[name="businessStatuses.1.isDefault"]').parent().click()

      cy.get('input[name="businessStatuses.0.isDefault"]').should('not.be.checked')
      cy.get('input[name="businessStatuses.1.isDefault"]').should('be.checked')
    })
  })
})
