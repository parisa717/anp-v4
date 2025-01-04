import { useTranslation } from '@nexus-ui/i18n'
import { ConfirmationModal } from '@nexus-ui/ui'
import { useNavigate, useParams } from 'react-router'

import { useActivateWorkshopWorkMutation } from '@/entities/work'
import { pageUrls } from '@/shared/lib'

const ActivateServiceConfirmationPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id = '' } = useParams<{ id: string }>()

  const translate = (key: string) => t(`pages.work.worksList.dialogs.activateService.${key}`)
  const [activateWorkshopWork, { isLoading, isError }] = useActivateWorkshopWorkMutation()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  if (!id) return null

  const onCancelClick = () => navigate(pageUrls.work.root())

  const onSaveClick = async () => {
    await activateWorkshopWork({ id })
    onCancelClick()
  }

  return (
    <ConfirmationModal
      minWidth={564}
      width="29%"
      title={translate('title')}
      onCancelClick={onCancelClick}
      onSaveClick={onSaveClick}
      isUpdating={isLoading}
    >
      <p className="leading-normal text-center font-semibold text-bluegray-700">{translate('description')}</p>
    </ConfirmationModal>
  )
}

export default ActivateServiceConfirmationPage
