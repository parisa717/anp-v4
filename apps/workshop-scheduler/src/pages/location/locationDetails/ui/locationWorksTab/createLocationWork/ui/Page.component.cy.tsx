import {
  CREATE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE,
  CREATE_LOCATION_WORK_SERVER_SIDE_ERROR_RESPONSE,
  GET_LOCATION_OPERATION_DEFAULT_RESPONSE,
  GET_WORKSHOP_WORKS_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'

import CreateLocationWorkPage from './Page'

const LOCATION_ID = '1'
describe('CreateLocationWorkPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocation')) {
        aliasQuery(req, 'GetLocation')
        successResponse(req, GET_LOCATION_OPERATION_DEFAULT_RESPONSE)
      }

      if (hasOperationName(req, 'GetWorkshopWorks')) {
        aliasQuery(req, 'GetWorkshopWorks')
        successResponse(req, GET_WORKSHOP_WORKS_DEFAULT_RESPONSE)
      }
    })
    cy.mountWithProviders(<CreateLocationWorkPage />, {
      initialRouteEntries: [`/location/${LOCATION_ID}/details/services/create`],
      route: '/location/:id/details/services/create',
    })
    cy.wait('@gqlGetLocationQuery')
    cy.wait('@gqlGetWorkshopWorksQuery')
  })

  describe('NewLocationWorkForm', () => {
    it('adds new empty work form', () => {
      cy.contains('button', 'Add service').click()
      cy.get('[data-pc-name="autocomplete"]').should('have.length', 2)
    })

    describe('submit', () => {
      it('shows an error for select work when no work selected', () => {
        cy.get('button[aria-label="save"]').click()
        cy.get('.text-error').should('exist')
      })

      it('shows an error for select brand when no brand selected', () => {
        cy.get('[data-pc-name="autocomplete"]').first().click().type('sus')
        cy.get(`[data-pc-section="item"]:contains(Suspension and Steering Service)`).eq(0).click()
        cy.get('button[aria-label="save"]').click()
        cy.get('.text-error').should('exist')
      })

      it('disables day limit in amount input when day limit in percent is filled', () => {
        cy.get('[data-pc-name="inputtext"]').eq(1).type('50')
        cy.get('[data-pc-name="inputtext"]').eq(2).should('be.disabled')
      })

      it('disables day limit in percent input when day limit in amount is filled', () => {
        cy.get('[data-pc-name="inputtext"]').eq(2).type('50')
        cy.get('[data-pc-name="inputtext"]').eq(1).should('be.disabled')
      })

      it('submits data correctly', () => {
        const capacityPerDayLimit = 50
        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'CreateLocationWork')) {
            aliasMutation(req, 'CreateLocationWork')
            expect(req.body.variables.locationWorks).to.deep.equal([
              {
                workId: '6',
                locationId: LOCATION_ID,
                isRecommended: false,
                amountPerDayLimit: null,
                capacityPerDayLimit: capacityPerDayLimit / 100,
                brands: [{ id: 'brand_1' }],
              },
            ])
            successResponse(req, CREATE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE)
          }
        })
        cy.get('[data-pc-name="autocomplete"]').first().click().type('sus')
        cy.get(`[data-pc-section="item"]:contains(Suspension and Steering Service)`).eq(0).click()
        cy.contains(`label`, 'Opel').click()
        cy.get('[data-pc-name="inputtext"]').eq(1).type(capacityPerDayLimit.toString())
        cy.get('button[aria-label="save"]').click()
        cy.wait('@gqlCreateLocationWorkMutation')
      })

      it('displays feature-specific server-side error', () => {
        const capacityPerDayLimit = 50

        cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
          if (hasOperationName(req, 'CreateLocationWork')) {
            aliasMutation(req, 'CreateLocationWork')
            errorResponse(req, CREATE_LOCATION_WORK_SERVER_SIDE_ERROR_RESPONSE)
          }
        })

        cy.mountWithProviders(<CreateLocationWorkPage />, {
          initialRouteEntries: ['/location/1/details/services/create'],
          route: '/location/:id/details/services/create',
        })

        cy.get('[data-pc-name="autocomplete"]').first().click().type('sus')
        cy.get(`[data-pc-section="item"]:contains(Suspension and Steering Service)`).eq(0).click()
        cy.contains(`label`, 'Opel').click()
        cy.get('[data-pc-name="inputtext"]').eq(1).type(capacityPerDayLimit.toString())
        cy.get('button[aria-label="save"]').click()
        cy.wait('@gqlCreateLocationWorkMutation')

        cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Location Work already exists.')
      })
    })
  })

  //TODO: uncomment when added copy location work
  // describe('CopyLocationWorkForm', () => {
  //   beforeEach(() => {
  //     cy.contains('label', 'Copy services from brand')
  //       .find('input[type="radio"]') // Locate the radio input inside the label
  //       .click()
  //   })

  //   it('shows error message when no selected brands', () => {
  //     cy.contains('This field is required').should('be.visible')
  //   })
  //   it('does not show error message when selected brand', () => {
  //     cy.get('[data-pc-section=trigger]').click()
  //     cy.get('[data-pc-section=item]').first().click()
  //     cy.contains('This field is required').should('not.exist')
  //   })
  // })
})
