import { useTranslation } from '@nexus-ui/i18n'
import { ConfirmationModal } from '@nexus-ui/ui'
import { useParams, useSearchParams } from 'react-router'

import { useDeleteWorkshopConnectedLocationsMutation } from '@/entities/location'
import { IdParam } from '@/shared/lib'

interface CancelConnectionDialogProps {
  connectedLocationId: string
}

export const CancelConnectionDialog = ({ connectedLocationId }: CancelConnectionDialogProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.connectedLocations.dialog.${key}`)
  const { id = '' } = useParams<IdParam>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [deleteConnectedLocations, { isLoading, isError }] = useDeleteWorkshopConnectedLocationsMutation()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const handleOnHide = () => {
    const updatedSearchParams = new URLSearchParams(searchParams)
    updatedSearchParams.delete('connectedLocationId')
    setSearchParams(updatedSearchParams, { replace: true })
  }

  const handleCancelConnection = async () => {
    await deleteConnectedLocations({ connectedLocationId, locationId: id })
    handleOnHide()
  }

  return (
    <ConfirmationModal
      minWidth={600}
      width="30%"
      title={translate('title')}
      onCancelClick={handleOnHide}
      onSaveClick={handleCancelConnection}
      isUpdating={isLoading}
    >
      <p className="text-center font-semibold text-bluegray-700">{translate('description')}</p>
    </ConfirmationModal>
  )
}
