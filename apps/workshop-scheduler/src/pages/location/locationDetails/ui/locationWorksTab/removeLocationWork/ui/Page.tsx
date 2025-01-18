import { useTranslation } from '@nexus-ui/i18n'
import { FormModal } from '@nexus-ui/ui'
import { useNavigate, useParams } from 'react-router'

import { RemoveLocationWorkParams, useDeleteLocationWorkMutation } from '@/entities/locationWork'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

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
    const result = await deleteLocationWork({
      id: locationWorkId,
    })

    if (result.data && !result.error) {
      navigateToDetails()
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
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.Location.Details.LocationWorks.Remove} className="mb-8" />
      <p className="text-xl text-bluegray-700 font-bold mt-0 mb-3 mx-0 text-center">{translate('description')}</p>
    </FormModal>
  )
}

export default RemoveLocationWorkPage
