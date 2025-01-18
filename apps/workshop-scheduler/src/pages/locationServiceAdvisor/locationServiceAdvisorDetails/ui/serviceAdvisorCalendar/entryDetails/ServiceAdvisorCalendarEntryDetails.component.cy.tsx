import { OverlayPanel } from 'primereact/overlaypanel'
import { createRef, RefObject } from 'react'
import { Event } from 'react-big-calendar'

import { CalendarEntryPeriodEnum, CalendarEntryTypeEnum } from '@/shared/api/types.generated'

import { toDateDisplay, toTimeRange } from '../../../lib'
import { ServiceAdvisorCalendarEntryDetails } from './ServiceAdvisorCalendarEntryDetails'

describe('ServiceAdvisorCalendarEntryDetails', () => {
  let ref: RefObject<OverlayPanel>
  let buttonEl: JSX.Element
  const buttonTitle = 'Open Details'

  beforeEach(() => {
    ref = createRef<OverlayPanel>()
    buttonEl = (
      <button id="open-overlay" onClick={(e) => ref.current?.toggle(e)}>
        {buttonTitle}
      </button>
    )
  })

  it('closes overlay correctly', () => {
    const title = 'Absence'
    const date = new Date(2024, 12, 11)

    const event: Event = {
      allDay: false,
      resource: {
        id: '1',
        startTime: '12:00',
        endTime: '14:00',
        eventTypeName: 'test',
        eventType: CalendarEntryTypeEnum.AdvisorBuffer,
        period: CalendarEntryPeriodEnum.None,
      },
      end: date,
      start: date,
    }
    cy.mountWithProviders(
      <>
        {buttonEl}
        <ServiceAdvisorCalendarEntryDetails entry={event} ref={ref} onClose={cy.stub} isInsideShowMorePopup={false} />
      </>,
    )
    cy.contains(buttonTitle).click()
    cy.get('button[title="close"]').click()
    cy.get(title).should('not.exist')
  })

  describe('buffer event', () => {
    const title = 'Absence'

    it('displays data correctly for advisor buffer non periodic event', () => {
      const date = new Date(2024, 12, 11)

      const event: Event = {
        allDay: false,
        resource: {
          id: '1',
          startTime: '12:00',
          endTime: '14:00',
          eventTypeName: 'test',
          eventType: CalendarEntryTypeEnum.AdvisorBuffer,
          period: CalendarEntryPeriodEnum.None,
        },
        end: date,
        start: date,
      }

      cy.mountWithProviders(
        <>
          {buttonEl}
          <ServiceAdvisorCalendarEntryDetails entry={event} ref={ref} onClose={cy.stub} isInsideShowMorePopup={false} />
        </>,
      )
      cy.contains(buttonTitle).click()
      ;[title, toDateDisplay(date), toTimeRange(event.resource)].forEach((value) => {
        cy.contains(value).should('exist')
      })
    })

    it('displays data correctly for advisor buffer periodic event', () => {
      const date = new Date(2024, 12, 11)
      const periodicEnd = '2024-12-25'
      const event: Event = {
        allDay: false,
        resource: {
          id: '1',
          startTime: '12:00',
          endTime: '14:00',
          eventTypeName: 'test',
          eventType: CalendarEntryTypeEnum.AdvisorBuffer,
          period: CalendarEntryPeriodEnum.Weekly,
          periodicEnd: periodicEnd,
        },
        end: date,
        start: date,
      }
      cy.mountWithProviders(
        <>
          {buttonEl}
          <ServiceAdvisorCalendarEntryDetails entry={event} ref={ref} onClose={cy.stub} isInsideShowMorePopup={false} />
        </>,
      )
      cy.contains(buttonTitle).click()
      ;[title, toDateDisplay(date), toTimeRange(event.resource), toDateDisplay(new Date(periodicEnd))].forEach(
        (value) => {
          cy.contains(value).should('exist')
        },
      )
    })
  })
})
