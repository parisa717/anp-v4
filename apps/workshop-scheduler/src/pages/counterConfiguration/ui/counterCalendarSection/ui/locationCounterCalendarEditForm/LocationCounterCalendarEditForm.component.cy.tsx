import { GET_COUNTER_CALENDAR_WORKING_DAYS } from '@cypress-fixtures'
import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'

import { LocationCounterCalendarEditForm } from './LocationCounterCalendarEditForm'

const workDays = GET_COUNTER_CALENDAR_WORKING_DAYS.getLocationCounterCalendar.workDays

describe('LocationCounterCalendarEditForm component', () => {
  beforeEach(() => {
    const onCancelClickSpy = cy.spy().as('onCancelClickSpy')

    cy.mountWithProviders(<LocationCounterCalendarEditForm workDaysData={workDays} onCancel={onCancelClickSpy} />)
  })

  it('should trigger onCancel callback when CANCEL button is clicked', () => {
    cy.contains('cancel').click()
    cy.get('@onCancelClickSpy').should('have.been.called')
  })

  it('should trigger onSubmit callback when form is submitted with valid values', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationCounterCalendar')) {
        aliasMutation(req, 'UpdateLocationCounterCalendar')

        expect(req.body.variables).to.deep.equal({
          locationId: '',
          workDays,
        })

        successResponse(req, {
          updateLocationCounterCalendar: {
            status: true,
          },
        })
      }
    })

    cy.get('form').submit()
    cy.wait('@gqlUpdateLocationCounterCalendarMutation')
  })

  it('should not submit the form when the start time is equal to or bigger than the end time of any working day', () => {
    cy.get('input').eq(0).click()
    cy.get('[data-pc-section="incrementbutton"]')
      .eq(0)
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
    cy.get('form').submit()

    cy.contains('save').should('exist')
    cy.contains('The end of the working time must be later than the start.').should('exist')
  })

  it('should not submit the form when the start time is equal to or bigger than the end time of any break', () => {
    cy.get('[data-cy="wednesday-breaks-0-startTime"]').find('input').click()
    cy.get('[data-pc-section="incrementbutton"]').eq(0).click()
    cy.get('form').submit()

    cy.contains('save').should('exist')
    cy.contains('The end of the working time must be later than the start.').should('exist')
  })

  it('should not submit the form if the break does not occur during working hours', () => {
    cy.get('[data-cy="wednesday-startTime"]').find('input').eq(0).click()
    cy.get('[data-pc-section="incrementbutton"]').eq(0).click().click()
    cy.get('form').submit()

    cy.contains('save').should('exist')
    cy.contains('The break must be during working hours.').should('exist')
  })

  it('should add and remove break for specific working day', () => {
    cy.get('[data-cy="monday-breaks-0-wrapper"]').should('not.exist')
    cy.get('[data-pc-section="bodyrow"]').eq(0).find('[data-cy="add-button"]').click()
    cy.get('[data-cy="monday-breaks-0-wrapper"]').should('exist')
    cy.get('[data-pc-section="bodyrow"]').eq(0).find('[data-cy="remove-button"]').click()
    cy.get('[data-pc-name="dialog"]').contains('confirm').click()
    cy.get('[data-cy="monday-breaks-0-wrapper"]').should('not.exist')
  })
})
