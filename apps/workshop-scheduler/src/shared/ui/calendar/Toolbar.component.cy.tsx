import { dateFnsLocalizer, ToolbarProps } from 'react-big-calendar'

import { Toolbar } from './Toolbar'

const localizer = dateFnsLocalizer({})
const irrelevantProps: Omit<ToolbarProps, 'date'> = {
  localizer,
  label: '',
  onNavigate: cy.stub,
  onView: cy.stub,
  view: 'month',
  views: [],
}

describe('Toolbar', () => {
  const headerText = 'text'
  it('renders properly', () => {
    cy.mountWithProviders(<Toolbar {...irrelevantProps} date={new Date()} headerText={headerText} />)
    cy.contains(headerText).should('be.visible')
    cy.contains('Today').should('be.visible')
    cy.contains('Day').should('be.visible')
    cy.contains('Week').should('be.visible')
    cy.contains('Month').should('be.visible')
  })

  const testCases = [
    { label: 'Week', value: 'week' },
    { label: 'Day', value: 'day' },
  ]

  testCases.forEach(({ label, value }) => {
    it('changes view when click on ${label} button', () => {
      const onClickView = cy.stub()
      cy.mountWithProviders(
        <Toolbar {...irrelevantProps} date={new Date()} headerText={headerText} onView={onClickView} />,
      )
      cy.contains(label).click()
      cy.wrap(onClickView).should('have.been.calledWith', value)
    })
  })

  it('changes date when click on navigate calendar button', () => {
    const onClickData = cy.stub()
    cy.mountWithProviders(
      <Toolbar {...irrelevantProps} date={new Date()} headerText={headerText} onNavigate={onClickData} />,
    )
    cy.get('.pi-angle-right').first().click()
    cy.wrap(onClickData).should('have.been.calledWith', 'NEXT')
    cy.contains('Today').click()
    cy.wrap(onClickData).should('have.been.calledWith', 'TODAY')
    cy.get('.pi-angle-left').first().click()
    cy.wrap(onClickData).should('have.been.calledWith', 'PREV')
  })
})
