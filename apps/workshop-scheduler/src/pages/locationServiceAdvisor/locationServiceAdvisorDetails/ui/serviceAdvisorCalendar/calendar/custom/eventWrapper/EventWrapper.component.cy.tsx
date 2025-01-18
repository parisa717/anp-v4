import { EventWrapperProps } from 'react-big-calendar'

import { EventWrapper } from './EventWrapper'

const irrelevantProps: Omit<EventWrapperProps, 'event'> = {
  accessors: {},
  className: '',
  continuesEarlier: false,
  continuesLater: false,
  getters: {},
  isRtl: false,
  label: '',
  onClick: cy.stub,
  onDoubleClick: cy.stub,
  selected: false,
}
const eventTypeName = 'type name'
const startTime = '10:00'
const endTime = '18:00'

describe('EventWrapper', () => {
  describe('all day event', () => {
    it('renders properly', () => {
      cy.mountWithProviders(
        <EventWrapper
          view="month"
          event={{ resource: { eventTypeName: eventTypeName, allDay: true } }}
          {...irrelevantProps}
        />,
      )
      cy.contains(eventTypeName).should('be.visible')
    })
  })

  describe('for week view and day view', () => {
    it('renders properly', () => {
      cy.mountWithProviders(
        <EventWrapper
          view="week"
          event={{ resource: { eventTypeName: eventTypeName, allDay: false, startTime, endTime } }}
          {...irrelevantProps}
        />,
      )
      cy.contains(eventTypeName).should('be.visible')
      cy.contains(startTime).should('be.visible')
      cy.contains(endTime).should('be.visible')
    })
  })

  describe('for month view', () => {
    it('renders properly', () => {
      cy.mountWithProviders(
        <EventWrapper
          view="month"
          event={{ resource: { eventTypeName: eventTypeName, allDay: false, startTime, endTime } }}
          {...irrelevantProps}
        />,
      )
      cy.contains(eventTypeName).should('be.visible')
      cy.contains(startTime).should('be.visible')
      cy.contains(endTime).should('be.visible')
    })
  })
})
