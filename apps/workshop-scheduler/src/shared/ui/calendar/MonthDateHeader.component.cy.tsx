import { DateHeaderProps } from 'react-big-calendar'

import { MonthDateHeader } from './MonthDateHeader'

const monthDateHeaderDefaultProps: Omit<DateHeaderProps, 'date' | 'label'> = {
  onDrillDown: cy.stub,
  drilldownView: 'day',
  isOffRange: true,
}
const label = 'calendar label'
const childrenElementContent = 'children element content'

describe('MonthDateHeader component', () => {
  it('should render correctly', () => {
    cy.mountWithProviders(
      <MonthDateHeader label={label} date={new Date()} {...monthDateHeaderDefaultProps}>
        {childrenElementContent}
      </MonthDateHeader>,
    )

    cy.contains(label).should('be.visible')
    cy.contains(childrenElementContent).should('be.visible')
  })
})
