import { GET_WORKSHOP_WORKS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import WorksListPage from './Page'

describe('WorksListPage', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopWorks')) {
        aliasQuery(req, 'GetWorkshopWorks')
        successResponse(req, GET_WORKSHOP_WORKS_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<WorksListPage />)
    cy.wait('@gqlGetWorkshopWorksQuery')
  })

  it('should render correctly', () => {
    cy.get('[data-cy="works-list-page-title"]').should('contain.text', 'Work to be carried out')
  })
})
