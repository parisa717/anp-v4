import { GET_WORKSHOP_WORK_LOCATION_WORKS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, errorResponse, hasOperationName, successResponse } from '@nexus-ui/utils'
import { useState } from 'react'

import { SelectedLocationEntity } from '../model/types'
import { LocationsAssignment } from './LocationsAssignment'

const WORK = {
  id: 'work-id',
  name: 'Work 1',
  qualificationId: 'qual-1',
  isActive: true,
  isDescriptionEditable: false,
  isCapacityEditable: true,
  brands: [{ id: 'brand_1', timeUnits: 1 }],
}

const LOCATIONS = GET_WORKSHOP_WORK_LOCATION_WORKS_DEFAULT_RESPONSE.getWorkshopWorkLocationWorks.locationWorks

const ACCORDION_HEADER = '.p-accordion-header'
const ACTIVE_ACCORDION = '.p-accordion-tab-active'
const CHECKBOX = '[data-pc-name="checkbox"]'

describe('LocationsAssignment', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopWorkLocationWorks')) {
        aliasQuery(req, 'GetWorkshopWorkLocationWorks')
        successResponse(req, GET_WORKSHOP_WORK_LOCATION_WORKS_DEFAULT_RESPONSE)
      }
    })

    const TestComponent = () => {
      const [selectedLocations, setSelectedLocations] = useState<SelectedLocationEntity[]>([])

      return (
        <LocationsAssignment
          work={WORK}
          selectedLocations={selectedLocations}
          isUpdating={false}
          onBack={cy.stub().as('onBack')}
          onSave={cy.stub().as('onSave')}
          setSelectedLocations={setSelectedLocations}
        />
      )
    }

    cy.mountWithProviders(<TestComponent />)

    cy.wait('@gqlGetWorkshopWorkLocationWorksQuery')
  })

  it('should render the component with accordion tabs', () => {
    cy.contains(WORK.name).should('be.visible')
  })

  it('should keep saved data when closing accordion', () => {
    cy.get(ACTIVE_ACCORDION).within(() => {
      cy.get(CHECKBOX).first().click()
    })

    cy.contains(ACCORDION_HEADER, WORK.name).click()

    cy.contains(ACCORDION_HEADER, WORK.name).click()
    cy.get(ACTIVE_ACCORDION).within(() => {
      cy.get(CHECKBOX).get('[data-pc-section="input"]').should('be.checked')
    })
  })

  it('should render LocationTable', () => {
    cy.get(ACTIVE_ACCORDION).within(() => {
      LOCATIONS.forEach((location) => {
        cy.contains(location.location.name).should('be.visible')
      })
    })
  })

  it('should trigger onBack callback when clicking Back button', () => {
    cy.mountWithProviders(
      <LocationsAssignment
        work={WORK}
        selectedLocations={[]}
        isUpdating={false}
        onBack={cy.stub().as('onBack')}
        onSave={cy.stub().as('onSave')}
        setSelectedLocations={cy.stub().as('setSelectedLocations')}
      />,
    )

    cy.wait('@gqlGetWorkshopWorkLocationWorksQuery')

    cy.get('@onBack').should('not.have.been.called')
    cy.contains('Back').click()
    cy.get('@onBack').should('have.been.calledOnce')
  })

  it('renders error state when query fails', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetWorkshopWorkLocationWorks')) {
        aliasQuery(req, 'GetWorkshopWorkLocationWorks')
        errorResponse(req, {
          message: 'User not authenticated',
          path: ['currentUser'],
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
    })

    cy.mountWithProviders(
      <LocationsAssignment
        work={WORK}
        selectedLocations={[]}
        isUpdating={false}
        onBack={cy.stub().as('onBack')}
        onSave={cy.stub().as('onSave')}
        setSelectedLocations={cy.stub().as('setSelectedLocations')}
      />,
    )
    cy.wait('@gqlGetWorkshopWorkLocationWorksQuery')

    cy.contains('Error').should('be.visible')
  })
})
