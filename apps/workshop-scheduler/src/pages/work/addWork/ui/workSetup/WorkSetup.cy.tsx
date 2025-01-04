import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE, GET_QUALIFICATIONS_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { aliasMutation, aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'
import i18n from 'i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { I18nextProvider } from 'react-i18next'

import { pageUrls } from '@/shared/lib'
import { DefaultWork, WorkSetupFormSchema, workSetupFormSchema } from '@/widgets/workForm'

import { WorkSetup } from './WorkSetup'

const WORKS = [{ id: '0230e230r-34534' }, { id: '2342-2fer-f34tbr' }]

const CANCEL_BUTTON = 'button[aria-label="Cancel"]'
const SKIP_AND_SAVE_BUTTON = 'button[aria-label="Skip & save"]'

describe('WorkSetup', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasMutation(req, 'CreateWorkshopWork')
      successResponse(req, { works: WORKS })
    })
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetQualifications')) {
        if (hasOperationName(req, 'GetQualifications')) {
          aliasQuery(req, 'GetQualifications')
          successResponse(req, GET_QUALIFICATIONS_DEFAULT_RESPONSE)
        }
      }
    })
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, {
          getBrands: {
            data: GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
          },
        })
      }
    })

    const TestComponent = () => {
      const { t } = useTranslation()

      const methods = useForm<WorkSetupFormSchema>({
        resolver: zodResolver(workSetupFormSchema(t)),
        defaultValues: {
          ...DefaultWork,
        },
      })

      return (
        <FormProvider {...methods}>
          <WorkSetup
            control={methods.control}
            errors={methods.formState.errors}
            handleSubmit={methods.handleSubmit}
            onNext={cy.stub()}
            setValue={methods.setValue}
          />
        </FormProvider>
      )
    }

    cy.mountWithProviders(
      <I18nextProvider i18n={i18n}>
        <TestComponent />
      </I18nextProvider>,
    )
    cy.wait('@gqlGetQualificationsQuery')
    cy.wait('@gqlGetBrandsQuery')
  })

  it('renders the form with default fields', () => {
    cy.contains('Define service setup').should('be.visible')

    cy.get('input[name="name"]').should('be.visible')
    cy.get('#qualificationId').should('be.visible')
    cy.get('#isActive').should('be.visible')
    cy.get('input[name="isDescriptionEditable"]').should('exist')
    cy.get('input[name="isCapacityEditable"]').should('exist')

    cy.contains('Cancel').should('be.visible')
    cy.contains('Skip & save').should('be.visible')
    cy.contains('Next').should('be.visible')
  })

  it('submits the form with valid data', () => {
    cy.get('input[name="name"]').type('Test')

    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('#isActive').click()
    cy.contains('Inactive').click()

    cy.get('input[name="isDescriptionEditable"]').check()
    cy.get('input[name="isCapacityEditable"]').check()

    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasMutation(req, 'CreateWorkshopWork')

      expect(req.body.variables).to.deep.equal({
        works: [
          {
            name: 'Test',
            qualification: { id: '1' },
            isDescriptionEditable: true,
            isCapacityEditable: true,
            isActive: true,
            brands: [{ id: 'mock_id', timeUnits: 1000 }],
          },
        ],
      })

      successResponse(req, { works: WORKS })
    })

    cy.contains('Next').click()
    cy.url().should('include', pageUrls.work.root())
  })

  it('displays error message when form is submitted with invalid data', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateWorkshopWork')) {
        aliasMutation(req, 'CreateWorkshopWork')
        successResponse(req, { works: WORKS })
      }
    })

    cy.get(SKIP_AND_SAVE_BUTTON).click()
    cy.contains('This field is required').should('be.visible')
  })

  it('cancels the form and navigates back', () => {
    cy.get(CANCEL_BUTTON).click()
    cy.url().should('include', pageUrls.work.root())
  })
})
