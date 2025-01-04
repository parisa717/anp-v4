import { GET_QUALIFICATIONS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'

import { CalendarFilters } from './CalendarFilters'

const qualifications = GET_QUALIFICATIONS_DEFAULT_RESPONSE.getQualifications.qualifications

describe('CalendarFilters component', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        aliasQuery(req, 'GetQualifications')
        successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
      }
    })
  })

  it('should render correctly', () => {
    cy.mountWithProviders(<CalendarFilters setFilters={() => {}} filters={[]} />)
    cy.wait('@gqlGetQualificationsQuery')

    qualifications.forEach((qualification, index) => {
      cy.get('[data-pc-name="checkbox"]').eq(index).should('be.visible')
      cy.contains(qualification.name).should('be.visible')
    })
  })

  it('should display checkboxes with the correct state as checked/unchecked', () => {
    const qualificationOne = qualifications[1].name
    const filters = [qualificationOne]

    cy.mountWithProviders(<CalendarFilters setFilters={() => {}} filters={filters} />)
    cy.wait('@gqlGetQualificationsQuery')

    cy.get(`#${qualificationOne}`).should('be.checked')
  })

  it('should trigger setFilters callback when any checkbox is clicked', () => {
    const onSetFiltersSpy = cy.spy().as('onSetFiltersSpy')

    cy.mountWithProviders(<CalendarFilters setFilters={onSetFiltersSpy} filters={[]} />)
    cy.wait('@gqlGetQualificationsQuery')

    cy.get('[data-pc-name="checkbox"]').eq(0).click()
    cy.get('@onSetFiltersSpy').should('have.been.called')
  })

  it('renders empty message when no filters', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        aliasQuery(req, 'GetQualifications')
        successResponse(req, {
          getQualifications: {
            qualifications: [],
          },
        })
      }
    })

    cy.mountWithProviders(<CalendarFilters setFilters={() => {}} filters={[]} />)
    cy.wait('@gqlGetQualificationsQuery')

    cy.contains('No filter available!').should('be.visible')
  })

  it('does not render filters content when GQL query errors', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        aliasQuery(req, 'GetQualifications')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(<CalendarFilters setFilters={() => {}} filters={[]} />)
    cy.wait('@gqlGetQualificationsQuery')

    cy.contains('Error occured!').should('be.visible')
  })
})
