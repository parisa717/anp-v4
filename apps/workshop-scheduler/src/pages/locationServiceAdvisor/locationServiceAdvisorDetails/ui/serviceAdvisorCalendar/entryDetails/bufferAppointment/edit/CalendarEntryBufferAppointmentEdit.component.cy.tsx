import { aliasMutation, hasOperationName } from '@nexus-ui/utils'
import { format, subDays } from 'date-fns'
import { Event } from 'react-big-calendar'

import { toISODate } from '@/pages/locationServiceAdvisor/locationServiceAdvisorDetails/lib'
import { CalendarEntryPeriodEnum, CalendarEntryTypeEnum } from '@/shared/api/types.generated'

import { CalendarEntryBufferAppointmentEdit } from './CalendarEntryBufferAppointmentEdit'

describe('ServiceAdvisorCalendarEntryDetails', () => {
  const id = '1'
  const date = new Date()
  const startTime = '10:00'
  const endTime = '18:00'
  const event: Event = {
    allDay: false,
    end: date,
    resource: {
      id,
      startTime,
      endTime,
      period: CalendarEntryPeriodEnum.None,
      periodicEnd: null,
    },
    start: date,
  }
  it('displays edited data correctly', () => {
    cy.mountWithProviders(<CalendarEntryBufferAppointmentEdit entry={event} onCancel={cy.stub} onSave={cy.stub} />)

    cy.get('input[name="date"]').should('have.value', format(date, 'dd-MM-yyyy'))
    cy.get('input[name="startTime"]').should('have.value', startTime)
    cy.get('input[name="endTime"]').should('have.value', endTime)
  })

  describe('validation', () => {
    it('shows error when start time is later than end time', () => {
      cy.mountWithProviders(
        <CalendarEntryBufferAppointmentEdit
          entry={{ ...event, resource: { ...event.resource, startTime: endTime, endTime: startTime } }}
          onCancel={cy.stub}
          onSave={cy.stub}
        />,
      )

      cy.get('button[aria-label="save"]').click()
      cy.contains('End time must be later than start time').should('exist')
    })

    it('shows error when start date is later than end date', () => {
      cy.mountWithProviders(
        <CalendarEntryBufferAppointmentEdit
          entry={{
            ...event,
            resource: { ...event.resource, period: CalendarEntryPeriodEnum.Weekly, periodicEnd: subDays(date, 2) },
          }}
          onCancel={cy.stub}
          onSave={cy.stub}
        />,
      )

      cy.get('button[aria-label="save"]').click()
      cy.contains('End date must be later than start date').should('exist')
    })

    it('shows error when end date is null and event is periodic', () => {
      cy.mountWithProviders(
        <CalendarEntryBufferAppointmentEdit
          entry={{
            ...event,
            resource: { ...event.resource, period: CalendarEntryPeriodEnum.Weekly, periodicEnd: undefined },
          }}
          onCancel={cy.stub}
          onSave={cy.stub}
        />,
      )
      cy.get('button[aria-label="save"]').click()
      cy.contains('This field is required').should('exist')
    })
  })

  it('submits data correctly', () => {
    const advisorId = '1'
    cy.stub(Date.prototype, 'getTimezoneOffset').returns(0)
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateServiceAdvisorCalendarEntry')) {
        aliasMutation(req, 'UpdateServiceAdvisorCalendarEntry')

        expect(req.body.variables).to.deep.equal({
          advisorId: advisorId,
          entryId: event.resource.id,
          isFullDay: false,
          period: event.resource.period,
          type: CalendarEntryTypeEnum.AdvisorBuffer,
          endDate: event.start ? toISODate(event.start) : null,
          startDate: event.start ? toISODate(event.start) : null,
          endTime: event.resource.endTime,
          startTime: event.resource.startTime,
          periodicEnd: null,
        })
      }
    })

    const onSave = cy.stub().as('onSave')
    cy.mountWithProviders(<CalendarEntryBufferAppointmentEdit entry={event} onCancel={cy.stub} onSave={onSave} />, {
      initialRouteEntries: [`/service-advisor/${advisorId}`],
      route: '/service-advisor/:id',
    })
    cy.get('button[aria-label="save"]').click()
    cy.wait('@gqlUpdateServiceAdvisorCalendarEntryMutation')
    cy.get('@onSave').should('have.been.calledOnce')
  })
})
