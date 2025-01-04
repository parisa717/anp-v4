import { useTranslation } from '@nexus-ui/i18n'
import { Modal } from '@nexus-ui/ui'
import { Button } from 'primereact/button'

interface Props {
  visible: boolean
  onCancelClick: () => void
  onConfirmClick: () => void
}

export const MinimalLocationOverbookingAppliedInfoModal = ({ visible, onCancelClick, onConfirmClick }: Props) => {
  const { t } = useTranslation()
  const translate = (key: string): string =>
    t(`pages.location.locationDetails.locationOverbooking.editMode.confirmModal.${key}`)

  const footerContent = (
    <Button
      className="flex mx-auto uppercase"
      data-cy="confirm-button"
      label={t('ok')}
      onClick={onConfirmClick}
      autoFocus
      severity="secondary"
      outlined
    />
  )

  return (
    <Modal
      visible={visible}
      minWidth={600}
      width="31%"
      onHide={onCancelClick}
      title={translate('title')}
      footer={footerContent}
    >
      <p className="font-semibold text-center text-bluegray-700 leading-normal">{translate('content')}</p>
    </Modal>
  )
}
