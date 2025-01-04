import {
  GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE,
  UPDATE_AVAILABILITY_COLORS_OPERATION_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import enTranslations from '@/app/translations/en.json'

import EditColorSetupPage from './Page'

type ValidationKey = keyof typeof enTranslations.pages.colorSetup.editColorSetup.form.validation

const getValidationMessage = (key: ValidationKey): string => {
  return enTranslations.pages.colorSetup.editColorSetup.form.validation[key]
}

describe('EditColorSetupPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetAvailabilityColors')) {
        aliasQuery(req, 'GetAvailabilityColors')
        successResponse(req, GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<EditColorSetupPage />)

    cy.wait('@gqlGetAvailabilityColorsQuery')
  })

  describe('renders correctly', () => {
    it('renders the page', () => {
      cy.contains('Color Setup').should('be.visible')
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').should('be.visible')

      cy.contains('Add Color').should('be.visible')

      cy.get('button[aria-label="save"]').should('be.visible')
      cy.get('button[aria-label="cancel"]').should('be.visible')
    })

    it('renders empty message when there is no availability colours data', () => {
      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'GetAvailabilityColors')) {
          aliasQuery(req, 'GetAvailabilityColors')
          successResponse(req, { availabilityColors: [] })
        }
      })

      cy.mountWithProviders(<EditColorSetupPage />)
      cy.wait('@gqlGetAvailabilityColorsQuery')

      cy.contains('No colors found').should('exist')
    })
  })

  describe('form submission', () => {
    it('submits the form with valid data', () => {
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('0-60')
      cy.get('#availabilityColors\\.1\\.capacityValueWithoutPercentages').clear().type('61-70')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'UpdateAvailabilityColors')) {
          aliasMutation(req, 'UpdateAvailabilityColors')

          expect(req.body.variables.availabilityColors[0]).to.deep.equal({
            color: '000000',
            minimalCapacity: 0,
            maximumCapacity: 60,
          })
          expect(req.body.variables.availabilityColors[1]).to.deep.equal({
            color: GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE.getAvailabilityColors.availabilityColors[1].color,
            minimalCapacity: 61,
            maximumCapacity: 70,
          })

          successResponse(req, UPDATE_AVAILABILITY_COLORS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      // We would like to pick the black colour from the color picker

      cy.get('.p-colorpicker-preview').eq(0).click()

      // Select any hue in color picker (doesn't matter much for black)
      cy.get('.p-colorpicker-hue').click(0, 0, { force: true })

      // Select black from color panel (bottom-right corner)
      cy.get('.p-colorpicker-color').then(($el) => {
        const rect = $el[0].getBoundingClientRect()

        // Calculate positions relative to the element
        const x = rect.width // All the way to the right to select black colour
        const y = rect.height // All the way to the bottom to select black colour

        cy.wrap($el).click(x, y, { force: true })
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlUpdateAvailabilityColorsMutation')
    })

    it('displays error messages for invalid form submission', () => {
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear()

      cy.get('button[aria-label="save"]').click()

      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').should('have.class', 'p-invalid')
    })
  })

  describe('removal of availability colour', () => {
    it('removes availability colour entry when remove button is clicked', () => {
      cy.get('#availabilityColors\\.3\\.capacityValueWithoutPercentages').should('be.visible')
      cy.get('.pi-trash').eq(0).click()
      cy.get('#availabilityColors\\.3\\.capacityValueWithoutPercentages').should('not.exist')

      // required to pass the validation
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('0-70')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'UpdateAvailabilityColors')) {
          aliasMutation(req, 'UpdateAvailabilityColors')

          expect(req.body.variables.availabilityColors[3]).to.be.undefined

          successResponse(req, UPDATE_AVAILABILITY_COLORS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlUpdateAvailabilityColorsMutation')
    })

    it('does not show remove button when there are less than 2 entries', () => {
      cy.get('.pi-trash').eq(0).click()
      cy.get('.pi-trash').eq(0).click()

      cy.get('.pi-trash').should('not.exist')
    })
  })

  describe('add new availability colour', () => {
    it('add button is disabled when there are more than 4 entries', () => {
      cy.get('button[aria-label="Add Color"]').should('be.disabled')
    })

    it('adds new availability colour when add button is clicked', () => {
      cy.get('.pi-trash').eq(0).click()

      cy.contains('Add Color').should('be.visible')
      cy.get('button[aria-label="Add Color"]').click()

      // required to pass the validation
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('0-70')
      cy.get('#availabilityColors\\.1\\.capacityValueWithoutPercentages').clear().type('71-80')
      cy.get('#availabilityColors\\.2\\.capacityValueWithoutPercentages').clear().type('81-90')
      cy.get('#availabilityColors\\.3\\.capacityValueWithoutPercentages').clear().type('>90')

      cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
        if (hasOperationName(req, 'UpdateAvailabilityColors')) {
          aliasMutation(req, 'UpdateAvailabilityColors')
          expect(req.body.variables.availabilityColors[3]).to.deep.equal({
            color: '000000',
            minimalCapacity: 90,
          })

          successResponse(req, UPDATE_AVAILABILITY_COLORS_OPERATION_DEFAULT_RESPONSE)
        }
      })

      cy.get('button[aria-label="save"]').click()

      cy.wait('@gqlUpdateAvailabilityColorsMutation')
    })
  })

  describe('availability colours client-side validation', () => {
    it('should trigger "The setup could not be saved because the first capacity level must start with 0" error', () => {
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('2-50')

      cy.get('button[aria-label="save"]').click()
      cy.contains(getValidationMessage('firstCapacityMustStartWithZero')).should('be.visible')
    })

    it('should trigger "The setup could not be saved because the values entered overlap"error', () => {
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('0-50')
      cy.get('#availabilityColors\\.1\\.capacityValueWithoutPercentages').clear().type('50-70')

      cy.get('button[aria-label="save"]').click()
      cy.contains(getValidationMessage('capacitiesShouldNotOverlap')).should('be.visible')
    })

    it('should trigger "The setup could not be saved because there are gaps between the values" error', () => {
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('0-50')
      cy.get('#availabilityColors\\.1\\.capacityValueWithoutPercentages').clear().type('55-70')

      cy.get('button[aria-label="save"]').click()
      cy.contains(getValidationMessage('capacitiesShouldNotHaveGaps')).should('be.visible')
    })

    it('should trigger "The setup could not be saved because the last capacity level > value of the previous gradation must be entered" error', () => {
      cy.get('#availabilityColors\\.2\\.capacityValueWithoutPercentages').clear().type('71-90')
      cy.get('#availabilityColors\\.3\\.capacityValueWithoutPercentages').clear().type('>100')

      cy.get('button[aria-label="save"]').click()
      cy.contains(getValidationMessage('lastCapacityShouldBeGreaterThanPrevious')).should('be.visible')
    })

    it('should trigger "The setup could not be saved because the values were entered in the wrong format" error', () => {
      cy.get('#availabilityColors\\.1\\.capacityValueWithoutPercentages').clear().type('51 - 70')

      cy.get('button[aria-label="save"]').click()
      cy.contains(getValidationMessage('capacityShouldHaveASpecifiedFormat')).should('be.visible')
    })

    it('should trigger "The setup could not be saved because >100 is the highest value that can be entered" error', () => {
      cy.get('#availabilityColors\\.3\\.capacityValueWithoutPercentages').clear().type('>120')

      cy.get('button[aria-label="save"]').click()
      cy.contains(getValidationMessage('lastCapacityShouldNotBeGreaterThan100')).should('be.visible')
    })

    it('should trigger multiple errors', () => {
      cy.get('#availabilityColors\\.0\\.capacityValueWithoutPercentages').clear().type('5-50')
      cy.get('#availabilityColors\\.2\\.capacityValueWithoutPercentages').clear().type('71-90')
      cy.get('#availabilityColors\\.3\\.capacityValueWithoutPercentages').clear().type('>100')

      cy.get('button[aria-label="save"]').click()

      cy.contains(getValidationMessage('firstCapacityMustStartWithZero')).should('be.visible')
      cy.contains(getValidationMessage('lastCapacityShouldBeGreaterThanPrevious')).should('be.visible')
    })
  })
})
