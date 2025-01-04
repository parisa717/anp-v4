import { useTranslation } from '@nexus-ui/i18n'
import { ConfirmationModal } from '@nexus-ui/ui'
import { useNavigate, useParams, useSearchParams } from 'react-router'

import {
  useActivateAdditionalBusinessStatusMutation,
  useDeactivateAdditionalBusinessStatusMutation,
} from '@/entities/additionalBusinessStatus'
import {
  changeBusinessStatusSearchParams,
  useActivateBusinessStatusMutation,
  useDeactivateBusinessStatusMutation,
} from '@/entities/businessStatus'
import { IdParam, pageUrls, ROUTE_PATHS, zodContract } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

const ChangeBusinessStatusConfirmationPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<IdParam>()

  const [activateBusinessStatus, { isLoading: isActivatingBusinessStatus }] = useActivateBusinessStatusMutation()
  const [deactivateBusinessStatus, { isLoading: isDeactivatingBusinessStatus }] = useDeactivateBusinessStatusMutation()
  const [activateAdditionalBusinessStatus, { isLoading: isActivatingAdditionalBusinessStatus }] =
    useActivateAdditionalBusinessStatusMutation()
  const [deactivateAdditionalBusinessStatus, { isLoading: isDeactivatingAdditionalBusinessStatus }] =
    useDeactivateAdditionalBusinessStatusMutation()

  const translate = (key: string) => t(`pages.businessStatus.changeBusinessStatusConfirmation.${key}`)

  const [urlSearchParams] = useSearchParams()
  const searchParams = Object.fromEntries(urlSearchParams.entries())

  if (!zodContract(changeBusinessStatusSearchParams).isData(searchParams)) {
    // TODO: Add proper error handling
    navigate(pageUrls.businessStatus.root())
    return null
  }

  const onSubmitHandler = async () => {
    if (id && searchParams) {
      const isAdditional = searchParams.isAdditionalBusinessStatus === 'true'
      const actions = {
        activate: isAdditional ? activateAdditionalBusinessStatus : activateBusinessStatus,
        deactivate: isAdditional ? deactivateAdditionalBusinessStatus : deactivateBusinessStatus,
      }

      const selectedAction = actions[searchParams.type]

      const result = await selectedAction({ id })

      if (result.data && !result.error) {
        navigate(pageUrls.businessStatus.root())
      }
    }
  }

  const handleCancelClick = () => {
    navigate(pageUrls.businessStatus.root())
  }

  return (
    <ConfirmationModal
      minWidth={564}
      width="30%"
      title={translate('title')}
      onCancelClick={handleCancelClick}
      onSaveClick={onSubmitHandler}
      isUpdating={
        isActivatingBusinessStatus ||
        isDeactivatingBusinessStatus ||
        isActivatingAdditionalBusinessStatus ||
        isDeactivatingAdditionalBusinessStatus
      }
    >
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.BusinessStatus.ChangeStatusConfirmation} className="mb-8" />
      <p className="text-center font-semibold text-bluegray-700">{translate('description')}</p>
    </ConfirmationModal>
  )
}

export default ChangeBusinessStatusConfirmationPage
