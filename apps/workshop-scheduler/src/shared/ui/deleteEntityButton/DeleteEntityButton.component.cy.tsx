import { UNASSIGN_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'

import { useUnassignBusinessStatusFromLocationMutation } from '@/entities/businessStatus'

import { DeleteEntityButton } from './DeleteEntityButton'

const BUSINESS_STATUS_ID = '111'
const LOCATION_ID = '100'

const SomeEntityDeleteButton = () => {
  const [
    unassignBusinessStatusFromLocationMutation,
    { isLoading: isLoadingUnassignBusinessStatusFromLocationMutation },
  ] = useUnassignBusinessStatusFromLocationMutation()

  const handleDelete = () =>
    unassignBusinessStatusFromLocationMutation({ businessStatusId: BUSINESS_STATUS_ID, locationId: LOCATION_ID })

  return <DeleteEntityButton onDelete={handleDelete} isLoading={isLoadingUnassignBusinessStatusFromLocationMutation} />
}

describe('DeleteEntityButton', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UnassignBusinessStatusFromLocation')) {
        aliasMutation(req, 'UnassignBusinessStatusFromLocation')

        expect(req.body.variables.businessStatusId).to.deep.equal(BUSINESS_STATUS_ID)
        expect(req.body.variables.locationId).to.deep.equal(LOCATION_ID)

        successResponse(req, UNASSIGN_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE)
      }
    })

    cy.mountWithProviders(<SomeEntityDeleteButton />)
  })

  it('should render delete button', () => {
    cy.get('button').should('contain.text', 'delete')
  })

  it('executes mutationHook when delete button is clicked', () => {
    cy.get('button').click()

    cy.wait('@gqlUnassignBusinessStatusFromLocationMutation')
  })
})
