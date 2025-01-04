import { dateFnsLocalizer } from 'react-big-calendar'

import { CalendarViewHeader } from './CalendarViewHeader'

const localizer = dateFnsLocalizer({})
const label = 'CalendarViewHeader label'
const currentDate = new Date('Thu Dec 26 2024 23:37:02 GMT+0100 (Central European Standard Time)')

describe('CalendarViewHeader component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<CalendarViewHeader label={label} date={currentDate} localizer={localizer} />)

    cy.contains(label).should('be.visible')
  })

  it('should render the full name of the working day in day mode', () => {
    cy.mountWithProviders(<CalendarViewHeader view="day" label={label} date={currentDate} localizer={localizer} />)

    cy.contains(label).should('not.exist')
    cy.contains('thursday').should('be.visible')
  })
})
