import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useNavigate } from 'react-router'

import { useAssignAdditionalBusinessStatusesToLocationMutation } from '@/entities/additionalBusinessStatus'
import { useAssignBusinessStatusesToLocationMutation } from '@/entities/businessStatus'
import { useGetCurrentLocation } from '@/entities/location'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { FORM_ID } from '../config/formId'
import { useCreateBusinessStatusByLocationPageData } from '../lib/useData'
import { useCreateBusinessStatusByLocationForm } from '../lib/useForm'
import { CreateBusinessStatusByLocationFormSchema } from '../model/formSchema'
import { CreateBusinessStatusByLocationForm } from './Form'

type CreateBusinessStatusByLocationPageProps = {
  isAdditionalBusinessStatus: boolean
}

const CreateBusinessStatusByLocationPage = ({
  isAdditionalBusinessStatus,
}: CreateBusinessStatusByLocationPageProps) => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const translate = (key: string) =>
    isAdditionalBusinessStatus
      ? t(`pages.businessStatusByLocation.createAdditionalBusinessStatusByLocationForm.${key}`)
      : t(`pages.businessStatusByLocation.createBusinessStatusByLocationForm.${key}`)

  const locationId = useGetCurrentLocation()

  const [assignBusinessStatusesToLocation, { isLoading: isUpdatingAssignBusinessStatusesToLocation }] =
    useAssignBusinessStatusesToLocationMutation()
  const [
    assignAdditionalBusinessStatusesToLocation,
    { isLoading: isUpdatingAssignAdditionalBusinessStatusesToLocation },
  ] = useAssignAdditionalBusinessStatusesToLocationMutation()

  const { isLoading, notFound, statusesSelectBoxOptions } = useCreateBusinessStatusByLocationPageData({
    isAdditionalBusinessStatus,
  })

  const {
    fields,
    control,
    formState: { errors },
    remove,
    handleAddAllStatuses,
    handleAddOneStatus,
    handleSubmit,
    watch,
  } = useCreateBusinessStatusByLocationForm()

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatusByLocation.root())
  }

  const onSubmitHandler = async (data: CreateBusinessStatusByLocationFormSchema) => {
    let result

    if (isAdditionalBusinessStatus) {
      result = await assignAdditionalBusinessStatusesToLocation({
        locationId,
        additionalBusinessStatuses: data.businessStatuses,
      })
    }

    if (!isAdditionalBusinessStatus) {
      result = await assignBusinessStatusesToLocation({ locationId, businessStatuses: data.businessStatuses })
    }

    if (result?.data && !result?.error) {
      navigate(pageUrls.businessStatusByLocation.root())
    }
  }

  return (
    <FormModal
      onCancelClick={handleCancelClick}
      formId={FORM_ID}
      width="28%"
      minWidth={669}
      title={translate('title')}
      isUpdating={isUpdatingAssignBusinessStatusesToLocation || isUpdatingAssignAdditionalBusinessStatusesToLocation}
      isLoading={isLoading}
      notFound={notFound}
    >
      <ServerSideErrorsMessagesList
        page={
          isAdditionalBusinessStatus
            ? ROUTE_PATHS.BusinessStatusByLocation.CreateAdditional
            : ROUTE_PATHS.BusinessStatusByLocation.Create
        }
      />
      <CreateBusinessStatusByLocationForm
        fields={fields}
        control={control}
        errors={errors}
        onRemove={remove}
        onAppend={handleAddOneStatus}
        onAddAll={handleAddAllStatuses}
        statusesSelectBoxOptions={statusesSelectBoxOptions}
        onSubmit={handleSubmit(onSubmitHandler)}
        watch={watch}
        isAdditionalBusinessStatus={isAdditionalBusinessStatus}
      />
    </FormModal>
  )
}

export default CreateBusinessStatusByLocationPage
