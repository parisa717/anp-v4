import { GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'
import { useState } from 'react'

import { SelectedLocationEntity } from '../model/types'
import { LocationsAssignment } from './LocationsAssignment'

const WORK = {
  name: 'Work 1',
  qualificationId: 'qual-1',
  isActive: true,
  isDescriptionEditable: false,
  isCapacityEditable: true,
  brands: [{ id: 'brand_1', timeUnits: 1 }],
}

const LOCATIONS = GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE.getLocations.locations

const ACCORDION_HEADER = '.p-accordion-header'
const ACTIVE_ACCORDION = '.p-accordion-tab-active'
const CHECKBOX = '[data-pc-name="checkbox"]'

describe('LocationsAssignment', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetLocations')) {
        aliasQuery(req, 'GetLocations')
        successResponse(req, GET_LOCATIONS_OPERATION_DEFAULT_RESPONSE)
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

    cy.wait('@gqlGetLocationsQuery')
  })

  it('should render the component with accordion tabs', () => {
    cy.contains(WORK.name).should('be.visible')
  })

  it('should render LocationTable', () => {
    cy.get(ACTIVE_ACCORDION).within(() => {
      LOCATIONS.forEach((location) => {
        cy.contains(location.name).should('be.visible')
      })
    })
  })

  it('should trigger onBack callback when clicking Back button', () => {
    cy.get('@onBack').should('not.have.been.called')
    cy.contains('Back').click()
    cy.get('@onBack').should('have.been.calledOnce')
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
})
