import { useTranslation } from '@nexus-ui/i18n'
import { ConfirmationModal } from '@nexus-ui/ui'
import { useNavigate, useParams } from 'react-router'

import { useDeactivateWorkshopWorkMutation } from '@/entities/work'
import { pageUrls } from '@/shared/lib'

const DeactivateServiceConfirmationPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id = '' } = useParams<{ id: string }>()

  const translate = (key: string) => t(`pages.work.worksList.dialogs.deactivateService.${key}`)
  const [deactivateWorkshopWork, { isLoading, isError }] = useDeactivateWorkshopWorkMutation()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  if (!id) return null

  const onCancelClick = () => navigate(pageUrls.work.root())

  const onSaveClick = async () => {
    await deactivateWorkshopWork({ id })
    onCancelClick()
  }

  return (
    <ConfirmationModal
      minWidth={1000}
      width="52%"
      title={translate('title')}
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
      isUpdating={isLoading}
    >
      <p className="leading-normal text-center font-semibold text-bluegray-700">{translate('description')}</p>
    </ConfirmationModal>
  )
}

export default DeactivateServiceConfirmationPage
