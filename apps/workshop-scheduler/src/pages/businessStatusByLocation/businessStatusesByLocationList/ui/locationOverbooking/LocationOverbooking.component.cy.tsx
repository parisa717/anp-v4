import {
  CAPACITY_OVERBOOKING_MULTIPLIER,
  GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE,
  MAX_CAPACITY_MULTIPLIER,
  MINIMUM_OVERBOOKING_MULTIPLIER,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { LocationOverbookingCapacity } from '../../model'
import { LocationOverbooking } from './LocationOverbooking'

const NEW_CAPACITY_OVERBOOKING_MULTIPLIER = 1.6
const NEW_MAX_CAPACITY_MULTIPLIER = 1.9
const MAX_LOCATION_OVERBOOKING = 2
const LOCATION_ID = '1'

const toStringifyPercentageValue = (value: number) => `${value * 100}%`
describe('LocationOverbooking', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocationOverbooking')) {
        aliasQuery(req, 'GetLocationOverbooking')
        successResponse(req, GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE)
      }
    })
  })
  describe('LocationOverbooking for Warning value', () => {
    beforeEach(() => {
      cy.mountWithProviders(
        <LocationOverbooking
          isEditingDisabled={false}
          locationId={LOCATION_ID}
          onChangeEditedType={() => {}}
          type={LocationOverbookingCapacity.Warning}
        />,
      )
      cy.wait('@gqlGetLocationOverbookingQuery')
    })

    it('renders the component', () => {
      cy.contains('Overbooking level - warning').should('be.visible')
      cy.get('[data-cy=location-overbooking]').should('be.visible')
    })

    describe('WarningLocationOverbooking preview', () => {
      it('renders the location overbooking preview with correct min value', () => {
        cy.get('[data-cy=min-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MINIMUM_OVERBOOKING_MULTIPLIER),
        )
      })
      it('renders the location overbooking preview with correct max value', () => {
        cy.get('[data-cy=max-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MAX_LOCATION_OVERBOOKING),
        )
      })
      it('renders the location overbooking preview with correct value', () => {
        cy.get('[data-cy=capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(CAPACITY_OVERBOOKING_MULTIPLIER),
        )
      })
      it('shows edition component when click on Edit button', () => {
        cy.get('[data-cy=capacity-overbooking-edit-button]').click()
        cy.get('[data-cy=capacity-overbooking-edit-form]').should('be.visible')
      })
    })

    describe('WarningLocationOverbooking edition', () => {
      const newValue = (NEW_CAPACITY_OVERBOOKING_MULTIPLIER * 100).toString()
      beforeEach(() => {
        cy.get('[data-cy=capacity-overbooking-edit-button]').click()
      })

      it('renders the location overbooking edit with correct min value', () => {
        cy.get('[data-cy=min-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MINIMUM_OVERBOOKING_MULTIPLIER),
        )
      })
      it('renders the location overbooking edit with correct max value', () => {
        cy.get('[data-cy=max-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MAX_LOCATION_OVERBOOKING),
        )
      })
      it('renders the location overbooking edit with correct value', () => {
        cy.get('[data-cy=slider-with-input-input-number]').should('have.value', CAPACITY_OVERBOOKING_MULTIPLIER * 100)
      })

      describe('on cancel edition', () => {
        it('should show preview with old value', () => {
          cy.get('[data-cy=slider-with-input-input-number]').clear().type(newValue)
          cy.get('[data-cy=cancel-button]').click()
          cy.get('[data-cy=capacity-overbooking]').should(
            'have.text',
            toStringifyPercentageValue(CAPACITY_OVERBOOKING_MULTIPLIER),
          )
        })
      })

      describe('on confirm edition', () => {
        it('should save updated value', () => {
          cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
            if (hasOperationName(req, 'UpdateLocationOverbooking')) {
              aliasMutation(req, 'UpdateLocationOverbooking')
              successResponse(req, {
                updateLocationOverbooking: {
                  status: true,
                },
              })
            }
          })

          cy.get('[data-cy=slider-with-input-input-number]').clear().type(newValue)
          cy.get('[data-cy=location-overbooking-edit-submit-button]').click()
          cy.wait('@gqlUpdateLocationOverbookingMutation').then((interception) => {
            expect(interception.request).to.not.be.undefined
            const requestBody = interception.request.body
            expect(requestBody).to.have.property('variables')
            expect(requestBody.variables).to.have.property('locationId', LOCATION_ID)
            expect(requestBody.variables).to.have.property(
              'capacityOverbookingMultiplier',
              NEW_CAPACITY_OVERBOOKING_MULTIPLIER,
            )
            expect(requestBody.variables).to.have.property('maxCapacityMultiplier', MAX_CAPACITY_MULTIPLIER)

            expect(interception.response).to.not.be.undefined
            if (interception.response) {
              expect(interception.response.statusCode).to.eq(200)
              expect(interception.response.body.data.updateLocationOverbooking.status).to.be.true
            } else {
              throw new Error('Response body is not defined')
            }
          })
        })
      })
    })
  })

  describe('LocationOverbooking for Maximum value', () => {
    beforeEach(() => {
      cy.mountWithProviders(
        <LocationOverbooking
          isEditingDisabled={false}
          locationId={LOCATION_ID}
          onChangeEditedType={() => {}}
          type={LocationOverbookingCapacity.Maximum}
        />,
      )
      cy.wait('@gqlGetLocationOverbookingQuery')
    })

    it('renders the component', () => {
      cy.contains('Overbooking level - no further appointments possible').should('be.visible')
      cy.get('[data-cy=location-overbooking]').should('be.visible')
    })

    describe('MaximumLocationOverbooking preview', () => {
      it('renders the location overbooking preview with correct min value', () => {
        cy.get('[data-cy=min-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(CAPACITY_OVERBOOKING_MULTIPLIER),
        )
      })
      it('renders the location overbooking preview with correct max value', () => {
        cy.get('[data-cy=max-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MAX_LOCATION_OVERBOOKING),
        )
      })
      it('renders the location overbooking preview with correct value', () => {
        cy.get('[data-cy=capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MAX_CAPACITY_MULTIPLIER),
        )
      })
      it('shows edition component when click on Edit button', () => {
        cy.get('[data-cy=capacity-overbooking-edit-button]').click()
        cy.get('[data-cy=capacity-overbooking-edit-form]').should('be.visible')
      })
    })

    describe('MaximumLocationOverbooking edition', () => {
      const newValue = (NEW_MAX_CAPACITY_MULTIPLIER * 100).toString()
      beforeEach(() => {
        cy.get('[data-cy=capacity-overbooking-edit-button]').click()
      })

      it('renders the location overbooking edit with correct min value', () => {
        cy.get('[data-cy=min-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(CAPACITY_OVERBOOKING_MULTIPLIER),
        )
      })
      it('renders the location overbooking edit with correct max value', () => {
        cy.get('[data-cy=max-capacity-overbooking]').should(
          'have.text',
          toStringifyPercentageValue(MAX_LOCATION_OVERBOOKING),
        )
      })
      it('renders the location overbooking edit with correct value', () => {
        cy.get('[data-cy=slider-with-input-input-number]').should('have.value', MAX_CAPACITY_MULTIPLIER * 100)
      })

      describe('on cancel edition', () => {
        it('should show preview with old value', () => {
          cy.get('[data-cy=slider-with-input-input-number]').clear().type(newValue)
          cy.get('[data-cy=cancel-button]').click()
          cy.get('[data-cy=capacity-overbooking]').should(
            'have.text',
            toStringifyPercentageValue(MAX_CAPACITY_MULTIPLIER),
          )
        })
      })

      describe('on confirm edition', () => {
        it('should save updated value', () => {
          cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
            if (hasOperationName(req, 'UpdateLocationOverbooking')) {
              aliasMutation(req, 'UpdateLocationOverbooking')
              successResponse(req, {
                updateLocationOverbooking: {
                  status: true,
                },
              })
            }
          })

          cy.get('[data-cy=slider-with-input-input-number]').clear().type(newValue)
          cy.get('[data-cy=location-overbooking-edit-submit-button]').click()
          cy.wait('@gqlUpdateLocationOverbookingMutation').then((interception) => {
            expect(interception.request).to.not.be.undefined
            const requestBody = interception.request.body
            expect(requestBody).to.have.property('variables')
            expect(requestBody.variables).to.have.property('locationId', LOCATION_ID)
            expect(requestBody.variables).to.have.property(
              'capacityOverbookingMultiplier',
              CAPACITY_OVERBOOKING_MULTIPLIER,
            )
            expect(requestBody.variables).to.have.property('maxCapacityMultiplier', NEW_MAX_CAPACITY_MULTIPLIER)

            expect(interception.response).to.not.be.undefined
            if (interception.response !== undefined) {
              expect(interception.response.statusCode).to.eq(200)
              expect(interception.response.body.data.updateLocationOverbooking.status).to.be.true
            } else {
              throw new Error('Response body is not defined')
            }
          })
        })
      })
    })
  })
})
