import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'

import { PermissionGate } from '@/app/providers/PermissionGate'

import { GET_USER_PERMISSIONS_RESPONSE } from '../../../../cypress/fixtures/permission'
import { BaseLayout } from './BaseLayout'

describe('BaseLayout', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetUserPermissions')) {
        aliasQuery(req, 'GetUserPermissions')

        successResponse(req, GET_USER_PERMISSIONS_RESPONSE)
      }
    })

    cy.mountWithProviders(
      <PermissionGate>
        <BaseLayout />
      </PermissionGate>,
    )
    cy.wait('@gqlGetUserPermissionsQuery')
  })

  it('should render the nav menu with the menu items', () => {
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').should('have.length', 8)
    cy.get('[data-cy="layout-menu"] [role="menuitem"]').eq(0).should('have.text', 'Work to be carried out')
  })
})
