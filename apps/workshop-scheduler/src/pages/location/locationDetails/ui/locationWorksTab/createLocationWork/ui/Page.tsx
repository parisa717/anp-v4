import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { useCreateLocationWorkMutation } from '@/entities/locationWork'
import { IdParam, pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import {
  CreateLocationWorkFormSchema,
  createLocationWorkFormSchemaInitValues,
  getCreateLocationWorkFormSchema,
} from '../model/createLocationWorkFormSchema'
import { CreateLocationWorkMode } from '../model/createLocationWorkModeTypes'
import { CopyLocationWorkForm } from './copyLocationWorkForm/CopyLocationWorkForm'
import { LocationFormModeRadioButton } from './locationFormModeRadioButton/LocationFormModeRadioButton'
import { NewLocationWorkForm } from './newLocationWorkForm/NewLocationWorkForm'

export type Brand = {
  id: string
  code: string
}

const CreateLocationWorkPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id = '' } = useParams<IdParam>()
  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.create.${key}`)

  const [additionMode, setAdditionMode] = useState<CreateLocationWorkMode>(CreateLocationWorkMode.NEW)

  const [createLocationWork, { isLoading: isCreateLocationWorkLoading }] = useCreateLocationWorkMutation()

  const isSelected = (mode: CreateLocationWorkMode) => additionMode === mode

  const [copiedBrand, setCopiedBrand] = useState<Brand | null>(null)
  const copiedBrandsError = copiedBrand !== null ? '' : t('validation.required')

  const form = useForm<CreateLocationWorkFormSchema>({
    defaultValues: {
      works: [createLocationWorkFormSchemaInitValues],
    },
    resolver: zodResolver(getCreateLocationWorkFormSchema(t)),
  })

  const handleCancelClick = () => {
    navigate(pageUrls.location.details.root(id))
  }

  const handleSubmitForm = () => {
    if (additionMode === CreateLocationWorkMode.NEW) {
      form.handleSubmit(handleNewLocationWorkSubmit)()
    }
    if (additionMode === CreateLocationWorkMode.COPY) {
      if (copiedBrand !== null) {
        //TODO navigates to modal manage services from brand
      }
    }
  }

  const handleNewLocationWorkSubmit = async (data: CreateLocationWorkFormSchema) => {
    const result = await createLocationWork({
      locationWorks: data.works.map((work) => ({
        amountPerDayLimit: work.amountPerDayLimit,
        capacityPerDayLimit: work.capacityPerDayLimit !== null ? work.capacityPerDayLimit / 100 : null,
        isRecommended: work.isRecommended,
        workId: work.id,
        brands: work.selectedBrands.map((brandId) => ({ id: brandId })),
        locationId: id,
      })),
    })

    if (result.data && !result.error) {
      navigate(pageUrls.location.details.root(id))
    }
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      onSaveClick={handleSubmitForm}
      width="36%"
      minWidth={695}
      title={translate(`title`)}
      isUpdating={false}
      isLoading={isCreateLocationWorkLoading}
    >
      <div className="flex gap-4 flex-col">
        <ServerSideErrorsMessagesList page={ROUTE_PATHS.Location.Details.LocationWorks.Create} className="mb-8" />
        {/**TODO: uncomment when ready CopyLocationWork */}
        {/* <LocationFormModeRadioButton
          isChecked={isSelected(CreateLocationWorkMode.COPY)}
          onClick={() => setAdditionMode(CreateLocationWorkMode.COPY)}
          title={translate('copyFromBrand')}
        /> */}
        {isSelected(CreateLocationWorkMode.COPY) && (
          <CopyLocationWorkForm selectedBrand={copiedBrand} onChange={setCopiedBrand} errorText={copiedBrandsError} />
        )}
        <LocationFormModeRadioButton
          isChecked={isSelected(CreateLocationWorkMode.NEW)}
          onClick={() => setAdditionMode(CreateLocationWorkMode.NEW)}
          title={translate('new')}
        />
        {isSelected(CreateLocationWorkMode.NEW) && (
          <FormProvider {...form}>
            <NewLocationWorkForm />
          </FormProvider>
        )}
      </div>
    </FormModal>
  )
}

export default CreateLocationWorkPage
