import { dateFnsLocalizer, EventProps } from 'react-big-calendar'

import { SingleDayEvent } from './SingleDayEvent'

const localizer = dateFnsLocalizer({})
const title = 'SingleDayEvent title'
const singleDayEventDefaultProps: Omit<EventProps, 'title'> = {
  event: {},
  continuesPrior: false,
  continuesAfter: false,
  localizer,
  slotStart: new Date(),
  slotEnd: new Date(),
}

describe('SingleDayEvent component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(<SingleDayEvent title={title} {...singleDayEventDefaultProps} />)

    cy.contains(title).should('be.visible')
  })
})
