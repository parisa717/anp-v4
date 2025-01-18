import {
  CREATE_WORKSHOP_WORK_SERVER_SIDE_ERROR_RESPONSE,
  GET_BRANDS_OPERATION_DEFAULT_RESPONSE,
  GET_QUALIFICATIONS_DEFAULT_RESPONSE,
} from '@cypress-fixtures'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import {
  aliasMutation,
  aliasQuery,
  COMMON_TEST_SELECTORS,
  errorResponse,
  hasOperationName,
  successResponse,
} from '@nexus-ui/utils'
import i18n from 'i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { I18nextProvider } from 'react-i18next'

import { DefaultWork, WorkSetupFormSchema, workSetupFormSchema } from '@/widgets/workForm'

import { WorkSetup } from './WorkSetup'

const WORKS = [{ id: '0230e230r-34534' }, { id: '2342-2fer-f34tbr' }]

const CANCEL_BUTTON = 'button[aria-label="Cancel"]'
const SKIP_AND_SAVE_BUTTON = 'button[aria-label="Skip & save"]'

describe('WorkSetup', () => {
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
          isLoading={false}
          onNext={cy.stub()}
          setValue={methods.setValue}
        />
      </FormProvider>
    )
  }

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
        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
      }
    })

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
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      aliasMutation(req, 'CreateWorkshopWork')

      expect(req.body.variables).to.deep.equal({
        workshopWork: {
          works: [
            {
              name: 'Test',
              qualification: { id: '1' },
              isDescriptionEditable: true,
              isCapacityEditable: true,
              isActive: false,
              brands: [{ id: 'brand_1', timeUnits: 2 }],
            },
          ],
        },
      })

      successResponse(req, { works: WORKS })
    })

    cy.get('input[name="name"]').type('Test')

    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('#isActive').click()
    cy.contains('Inactive').click()

    cy.get('input[name="isDescriptionEditable"]').check()
    cy.get('input[name="isCapacityEditable"]').check()

    cy.get('#brands\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.get('#brands\\.0\\.timeUnits').type('2')

    cy.contains('Skip & save').click()
    cy.wait('@gqlCreateWorkshopWorkMutation')
  })

  it('displays feature-specific server-side error', () => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'CreateWorkshopWork')) {
        aliasMutation(req, 'CreateWorkshopWork')
        errorResponse(req, CREATE_WORKSHOP_WORK_SERVER_SIDE_ERROR_RESPONSE)
      }
    })

    cy.mountWithProviders(
      <I18nextProvider i18n={i18n}>
        <TestComponent />
      </I18nextProvider>,
      {
        initialRouteEntries: ['/work/add'],
        route: '/work/add',
      },
    )

    cy.get('input[name="name"]').type('Test')

    cy.get('#qualificationId').click()
    cy.contains('Mechanics').click()
    cy.get('#isActive').click()
    cy.contains('Inactive').click()

    cy.get('input[name="isDescriptionEditable"]').check()
    cy.get('input[name="isCapacityEditable"]').check()

    cy.get('#brands\\.0\\.id').click()
    cy.contains('Opel').click()
    cy.get('#brands\\.0\\.timeUnits').type('2')

    cy.contains('Skip & save').click()

    cy.wait('@gqlCreateWorkshopWorkMutation')

    cy.get(COMMON_TEST_SELECTORS.APP_MESSAGE).should('include.text', 'Work already exists.')
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
    cy.contains('Define service setup').should('not.exist')
  })
})
