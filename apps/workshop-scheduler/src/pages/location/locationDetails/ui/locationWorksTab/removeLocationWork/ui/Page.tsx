import { FormModal } from '@nexus-ui/ui'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import { RemoveLocationWorkParams, useDeleteLocationWorkMutation } from '@/entities/locationWork'
import { pageUrls } from '@/shared/lib'

const RemoveLocationWorkPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id: locationId = '', locationWorkId = '' } = useParams<RemoveLocationWorkParams>()

  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.remove.${key}`)

  const [deleteLocationWork, { isLoading: isDeleteLocationWorkLoading }] = useDeleteLocationWorkMutation()

  const navigateToDetails = () => {
    navigate(pageUrls.location.details.root(locationId))
  }

  const handleSubmitForm = async () => {
    try {
      await deleteLocationWork({
        id: locationWorkId,
      })
      navigateToDetails()
    } catch {
      //TODO: handle error
    }
  }

  return (
    <FormModal
      onCancelClick={navigateToDetails}
      onSaveClick={handleSubmitForm}
      width="32%"
      minWidth={612}
      title={translate(`title`)}
      isUpdating={isDeleteLocationWorkLoading}
      isLoading={false}
    >
      <p className="text-xl text-bluegray-700 font-bold mt-0 mb-3 mx-0 text-center">{translate('description')}</p>
    </FormModal>
  )
}

export default RemoveLocationWorkPage
