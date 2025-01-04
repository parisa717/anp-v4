import { formatISO } from 'date-fns'
import { dateFnsLocalizer } from 'react-big-calendar'

import { WorkDay } from '../../../../../model'
import { DayHeader } from './DayHeader'

const localizer = dateFnsLocalizer({})
describe('DayHeader', () => {
  const labelText = 'test'

  it('shows label properly', () => {
    cy.mountWithProviders(<DayHeader label={labelText} date={new Date()} workDays={[]} localizer={localizer} />)
    cy.contains(labelText).should('be.visible')
  })

  it('show work day time when date is work day', () => {
    const date = new Date()
    const workDays: WorkDay[] = [
      {
        date: date,
        dateString: formatISO(date, { representation: 'date' }),
        endDate: date,
        startDate: date,
        endTime: '18:00',
        startTime: '10:00',
      },
    ]
    cy.mountWithProviders(<DayHeader label={labelText} date={date} workDays={workDays} localizer={localizer} />)
    cy.contains(workDays[0].startTime).should('be.visible')
    cy.contains(workDays[0].endTime).should('be.visible')
  })
})
