import { useTranslation } from '@nexus-ui/i18n'
import { Modal } from '@nexus-ui/ui'
import { Button } from 'primereact/button'

interface ConfirmModalProps {
  visible: boolean
  onCancelClick: () => void
  onConfirmClick: () => void
}

export const ConfirmModal = ({ visible, onCancelClick, onConfirmClick }: ConfirmModalProps) => {
  const { t } = useTranslation()
  const translate = (key: string): string => t(`pages.brands.editBrand.confirmModal.${key}`)

  const footerContent = (
    <section className="flex justify-between items-center w-full">
      <Button severity="secondary" outlined label={t('cancel')} onClick={onCancelClick} className="capitalize" />
      <Button label={t('confirm')} onClick={onConfirmClick} autoFocus className="capitalize" />
    </section>
  )

  return (
    <Modal visible={visible} width={881} onHide={onCancelClick} title={translate('title')} footer={footerContent}>
      <p className="font-semibold	text-center">{translate('message.part1')}</p>
      <p className="font-semibold	text-center">{translate('message.part2')}</p>
    </Modal>
  )
}
