import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'

import { Modal, ModalProps } from '../Modal'

export type FormModalProps = Omit<ModalProps, 'onHide' | 'footer' | 'visible'> & {
  onCancelClick: () => void
  isUpdating?: boolean
  isLoading?: boolean
  isSaveButtonDisabled?: boolean
  notFound?: boolean
  footer?: ModalProps['footer']
} & (
    | {
        formId: string
        onSaveClick?: never
      }
    | {
        formId?: never
        onSaveClick: () => void
      }
  )

export const FormModal = ({
  onSaveClick,
  footer,
  onCancelClick,
  isUpdating,
  isLoading,
  isSaveButtonDisabled,
  notFound,
  children,
  formId,
  ...modalProps
}: FormModalProps) => {
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
        loading={isUpdating}
      />
      <Button
        type={formId ? 'submit' : 'button'}
        form={formId}
        label={t('save')}
        onClick={formId ? undefined : onSaveClick}
        autoFocus
        className="capitalize mr-0"
        loading={isUpdating}
        disabled={isSaveButtonDisabled}
      />
    </section>
  )

  const content = isLoading ? (
    <ProgressSpinner
      className="w-full overflow-hidden h-14"
      pt={{
        spinner: {
          className: 'size-14',
        },
      }}
    />
  ) : notFound ? (
    t('not found')
  ) : (
    children
  )

  return (
    <Modal {...modalProps} onHide={onCancelClick} footer={footerContent} visible>
      {content}
    </Modal>
  )
}
