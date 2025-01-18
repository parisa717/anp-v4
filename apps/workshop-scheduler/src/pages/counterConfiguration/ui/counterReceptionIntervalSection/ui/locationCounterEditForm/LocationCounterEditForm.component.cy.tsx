import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'

import { LocationCounterEditForm } from './LocationCounterEditForm'

const COUNTER_RECEPTION_INTERVAL_VALUE = 10

describe('LocationCounterEditForm component', () => {
  beforeEach(() => {
    const onCancelClickSpy = cy.spy().as('onCancelClickSpy')

    cy.mountWithProviders(
      <LocationCounterEditForm
        counterReceptionInterval={COUNTER_RECEPTION_INTERVAL_VALUE}
        onCancel={onCancelClickSpy}
      />,
    )
  })

  it('should render correctly', () => {
    cy.contains('Define slots frequency').should('exist')
    cy.get('[data-pc-section="input"]').should('contain.text', `${COUNTER_RECEPTION_INTERVAL_VALUE} minutes`)
  })

  it('should trigger onCancel callback when CANCEL button is clicked', () => {
    cy.contains('cancel').click()
    cy.get('@onCancelClickSpy').should('have.been.called')
  })

  it('should trigger onSave callback when counter reception interval value is saved', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'UpdateLocationCounterReceptionInterval')) {
        aliasMutation(req, 'UpdateLocationCounterReceptionInterval')

        expect(req.body.variables).to.deep.equal({
          locationId: '',
          receptionInterval: COUNTER_RECEPTION_INTERVAL_VALUE,
        })

        successResponse(req, {
          updateLocationCounterReceptionInterval: {
            status: true,
          },
        })
      }
    })

    cy.contains('save').click()
    cy.wait('@gqlUpdateLocationCounterReceptionIntervalMutation')
  })
})
