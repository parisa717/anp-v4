import { aliasMutation, hasOperationName, successResponse } from '@nexus-ui/utils'
import { mount } from 'cypress/react18'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router'

import { getStore } from '@/app/store'

import { CancelConnectionDialog } from './CancelConnectionDialog'

const CONNECTED_LOCATION_ID = '1230'
const LOCATION_ID = '123123'
const DIALOG_HEADER = '[data-pc-section="header"]'
const DIALOG_CANCEL_BUTTON = '[aria-label="cancel"]'
const DIALOG_SUBMIT_BUTTON = '[aria-label="confirm"]'
const MOCK_TRANSLATIONS_TITLE = 'Cancel location connection'

Cypress.Commands.add('mountWithProviders', (component, options = {}) => {
  const {
    reduxStore = getStore(),
    initialRouteEntries = [`/workshops/${LOCATION_ID}?connectedLocationId=${CONNECTED_LOCATION_ID}`],
    route = '/workshops/:id',
    ...mountOptions
  } = options

  const wrapped = (
    <Provider store={reduxStore}>
      <MemoryRouter initialEntries={initialRouteEntries}>
        <Routes>
          <Route path={route} element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  mount(wrapped, mountOptions)
})

describe('CancelConnectionDialog', () => {
  beforeEach(() => {
    cy.mountWithProviders(<CancelConnectionDialog connectedLocationId={CONNECTED_LOCATION_ID} />)
  })

  it('renders the dialog correctly', () => {
    cy.contains(DIALOG_HEADER, MOCK_TRANSLATIONS_TITLE).should('be.visible')
    cy.contains('p', 'Are you sure you want to unselect the location?').should('be.visible')

    cy.get(DIALOG_CANCEL_BUTTON).should('be.visible')
    cy.get(DIALOG_SUBMIT_BUTTON).should('be.visible')
  })

  it('closes the dialog when cancel is clicked', () => {
    cy.get(DIALOG_CANCEL_BUTTON).click()
    cy.get(MOCK_TRANSLATIONS_TITLE).should('not.exist')
  })

  it('fires the delete request when submit is clicked', () => {
    cy.get(DIALOG_SUBMIT_BUTTON).click()

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'DeleteWorkshopConnectedLocations')) {
        aliasMutation(req, 'DeleteWorkshopConnectedLocations')

        expect(req.body.variables).to.deep.equal({
          locationId: LOCATION_ID,
          connectedLocationId: CONNECTED_LOCATION_ID,
        })

        successResponse(req, {
          deleteWorkshopConnectedLocations: {
            status: true,
          },
        })
      }
    })

    cy.get(MOCK_TRANSLATIONS_TITLE).should('not.exist')
  })
})
