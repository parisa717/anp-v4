import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

import { Modal, ModalProps } from '../Modal'

export type ConfirmationModalProps = Omit<ModalProps, 'onHide' | 'footer' | 'visible'> & {
  onCancelClick: () => void
  onSaveClick: () => void
  isUpdating?: boolean
  isLoading?: boolean
  notFound?: boolean
  footer?: ModalProps['footer']
}

export const ConfirmationModal = ({
  onSaveClick,
  footer,
  onCancelClick,
  isUpdating,
  isLoading,
  notFound,
  children,
  ...modalProps
}: ConfirmationModalProps) => {
  const { t } = useTranslation()

  const footerContent = footer ? (
    footer
  ) : (
    <section className="flex justify-between items-center w-full">
      <Button
        severity="secondary"
        outlined
        label={t('cancel')}
        onClick={onCancelClick}
        className="capitalize"
        disabled={isUpdating}
      />
      <Button
        type="button"
        label={t('confirm')}
        onClick={onSaveClick}
        autoFocus
        className="capitalize mr-0"
        disabled={isUpdating}
      />
    </section>
  )

  const content = isLoading ? t('loading') : notFound ? t('not found') : children

  return (
    <Modal {...modalProps} onHide={onCancelClick} footer={footerContent} visible>
      {content}
    </Modal>
  )
}
