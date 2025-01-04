import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useNavigate } from 'react-router'

import { useAssignAdditionalBusinessStatusesToLocationMutation } from '@/entities/additionalBusinessStatus'
import { useAssignBusinessStatusesToLocationMutation } from '@/entities/businessStatus'
import { useGetCurrentLocation } from '@/entities/location'
import { pageUrls } from '@/shared/lib'

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
  } = useCreateBusinessStatusByLocationForm()

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatusByLocation.root())
  }

  const onSubmitHandler = async (data: CreateBusinessStatusByLocationFormSchema) => {
    //TODO: Add error handling

    if (isAdditionalBusinessStatus) {
      await assignAdditionalBusinessStatusesToLocation({
        locationId,
        additionalBusinessStatuses: data.businessStatuses,
      })
    }

    if (!isAdditionalBusinessStatus) {
      await assignBusinessStatusesToLocation({ locationId, businessStatuses: data.businessStatuses })
    }

    navigate(pageUrls.businessStatusByLocation.root())
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
      <CreateBusinessStatusByLocationForm
        fields={fields}
        control={control}
        errors={errors}
        onRemove={remove}
        onAppend={handleAddOneStatus}
        onAddAll={handleAddAllStatuses}
        statusesSelectBoxOptions={statusesSelectBoxOptions}
        onSubmit={handleSubmit(onSubmitHandler)}
        isAdditionalBusinessStatus={isAdditionalBusinessStatus}
      />
    </FormModal>
  )
}

export default CreateBusinessStatusByLocationPage
