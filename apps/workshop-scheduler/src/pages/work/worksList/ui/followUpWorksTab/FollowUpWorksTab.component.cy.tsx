import { GET_WORKSHOP_FOLLOW_UP_WORKS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { FollowUpWorkEntity } from '@/entities/followUpWork'

import { FollowUpWorksTab } from './FollowUpWorksTab'

const ROW = '[data-pc-section="bodyrow"]'
const CELL = '[data-pc-section="bodycell"]'

const FOLLOW_UP_WORKS_DATA = GET_WORKSHOP_FOLLOW_UP_WORKS_DEFAULT_RESPONSE.getWorkshopFollowUpWorks.works

const verifyTableRendering = (columnsData: string[][]) => {
  cy.get(ROW).each((row, rowIndex) => {
    cy.wrap(row)
      .find(CELL)
      .each((cell, columnIndex) => {
        cy.wrap(cell).should('contain.text', columnsData[rowIndex][columnIndex])
      })
  })
}

describe('FollowUpWorksListTab component', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopFollowUpWorks')) {
        aliasQuery(req, 'GetWorkshopFollowUpWorks')
        successResponse(req, GET_WORKSHOP_FOLLOW_UP_WORKS_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<FollowUpWorksTab />)
    cy.wait('@gqlGetWorkshopFollowUpWorksQuery')
  })

  it('renders the follow up works list table correctly', () => {
    const getFollowUpWorksFields = (work: FollowUpWorkEntity) => [
      work.name,
      work.timeUnits.toString(),
      work.qualification.name,
      '',
      '',
      'active',
      'edit',
    ]

    cy.get(ROW).should('have.length', FOLLOW_UP_WORKS_DATA.length)

    verifyTableRendering(FOLLOW_UP_WORKS_DATA.map((work) => getFollowUpWorksFields(work)))
  })

  it('renders an empty message when no follow up works data is available', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopFollowUpWorks')) {
        aliasQuery(req, 'GetWorkshopFollowUpWorks')
        successResponse(req, { getWorkshopFollowUpWorks: null })
      }
    })

    cy.mountWithProviders(<FollowUpWorksTab />)
    cy.wait('@gqlGetWorkshopFollowUpWorksQuery')
    cy.contains('No follow up works to be carried out found').should('be.visible')
  })

  it('does not render follow up works list table rows when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopFollowUpWorks')) {
        aliasQuery(req, 'GetWorkshopFollowUpWorks')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<FollowUpWorksTab />)
    cy.wait('@gqlGetWorkshopFollowUpWorksQuery')

    cy.get(ROW).should('not.exist')
  })
})
