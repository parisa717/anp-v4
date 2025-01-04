import { dateFnsLocalizer } from 'react-big-calendar'

import { MonthHeader } from './MonthHeader'

const localizer = dateFnsLocalizer({})
const label = 'MonthHeader label'

describe('MonthHeader component', () => {
  it('should renders correctly', () => {
    cy.mountWithProviders(<MonthHeader label={label} date={new Date()} localizer={localizer} />)

    cy.contains(label).should('be.visible')
  })
})
