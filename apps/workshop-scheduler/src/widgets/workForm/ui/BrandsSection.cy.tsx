import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE } from '@cypress-fixtures'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { aliasQuery, hasOperationName, successResponse } from '@nexus-ui/utils'
import i18n from 'i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { I18nextProvider } from 'react-i18next'

import { DefaultWork } from '../model/consts'
import { WorkSetupFormSchema, workSetupFormSchema } from '../model/formSchema'
import { BrandsSection } from './BrandsSection'

const ADD_BRAND_BUTTON = 'button[aria-label="Add brand"]'
const ADD_ALL_BRANDS_BUTTON = 'button[aria-label="Add all brands"]'
const BRAND_SELECT = '#brands\\.0\\.id'
const CONFIRM_MODAL_BUTTON = 'button[aria-label="confirm"]'
const REMOVE_BRAND_BUTTON = '[data-cy="remove-brand-button"]'

describe('BrandsSection', () => {
  beforeEach(() => {
    cy.intercept('POST', import.meta.env.VITE_API_ENDPOINT, (req) => {
      if (hasOperationName(req, 'GetBrands')) {
        aliasQuery(req, 'GetBrands')
        successResponse(req, GET_BRANDS_OPERATION_DEFAULT_RESPONSE)
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
          <BrandsSection control={methods.control} errors={methods.formState.errors} setValue={methods.setValue} />
        </FormProvider>
      )
    }

    cy.mountWithProviders(
      <I18nextProvider i18n={i18n}>
        <TestComponent />
      </I18nextProvider>,
    )
    cy.wait('@gqlGetBrandsQuery')
  })

  it('renders correctly', () => {
    cy.get(ADD_BRAND_BUTTON).should('exist').and('not.be.disabled')
    cy.get(ADD_ALL_BRANDS_BUTTON).should('exist').and('not.be.disabled')
    cy.get(BRAND_SELECT).should('exist')
  })

  it('adds a new brand field when "Add Brand" is clicked', () => {
    cy.get(ADD_BRAND_BUTTON).click()
    cy.get('#brands\\.1\\.id').should('exist')
  })

  it('opens the TimeUnitsModal when "Add All Brands" is clicked', () => {
    cy.get(ADD_ALL_BRANDS_BUTTON).click()
    cy.contains('Time units').should('be.visible')
  })

  it('disables "Add Brand" and "Add All Brands" when all brands are added', () => {
    cy.get(ADD_ALL_BRANDS_BUTTON).click()
    cy.get(CONFIRM_MODAL_BUTTON).click()

    cy.get(ADD_BRAND_BUTTON).should('be.disabled')
    cy.get(ADD_ALL_BRANDS_BUTTON).should('be.disabled')
  })

  it('removes a brand when the remove button is clicked', () => {
    cy.get(ADD_BRAND_BUTTON).click()
    cy.get('#brands\\.1\\.id').should('exist')
    cy.get(REMOVE_BRAND_BUTTON).last().click()
    cy.get('#brands\\.0\\.id').should('exist')
    cy.get('#brands\\.1\\.id').should('not.exist')
  })
})
