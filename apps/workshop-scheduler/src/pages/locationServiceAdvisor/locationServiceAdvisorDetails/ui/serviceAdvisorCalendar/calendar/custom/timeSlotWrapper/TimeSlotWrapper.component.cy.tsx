import { formatISO } from 'date-fns'

import { WorkDay } from '../../../../../model'
import { TimeSlotWrapper } from './TimeSlotWrapper'

describe('TimeSlotWrapper', () => {
  const childrenElement = 'children'

  it('shows children properly', () => {
    cy.mountWithProviders(
      <TimeSlotWrapper workDays={[]} value={new Date()}>
        {childrenElement}
      </TimeSlotWrapper>,
    )
    cy.contains(childrenElement).should('be.visible')
  })

  it('has correct style when date is within work time', () => {
    const date = new Date()
    date.setHours(14)
    const startDate = new Date()
    startDate.setHours(10)
    const endDate = new Date()
    endDate.setHours(18)
    const workDays: WorkDay[] = [
      {
        date: date,
        dateString: formatISO(date, { representation: 'date' }),
        endDate: endDate,
        startDate: startDate,
        endTime: '18:00',
        startTime: '10:00',
      },
    ]
    cy.mountWithProviders(
      <TimeSlotWrapper workDays={workDays} value={date}>
        {childrenElement}
      </TimeSlotWrapper>,
    )
    cy.get('.bg-shade-000').should('exist')
  })

  it('has correct style when date is within work time', () => {
    cy.mountWithProviders(
      <TimeSlotWrapper workDays={[]} value={new Date()}>
        {childrenElement}
      </TimeSlotWrapper>,
    )
    cy.get('.bg-shade-100').should('exist')
  })
})
