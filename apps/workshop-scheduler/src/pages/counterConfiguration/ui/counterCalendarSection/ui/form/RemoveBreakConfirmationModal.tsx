import { useTranslation } from '@nexus-ui/i18n'
import { ConfirmationModal } from '@nexus-ui/ui'

interface RemoveBreakConfirmationModalProps {
  open: boolean
  onCancel: () => void
  onRemove: () => void
}

export const RemoveBreakConfirmationModal = ({ open, onCancel, onRemove }: RemoveBreakConfirmationModalProps) => {
  const { t } = useTranslation()

  if (!open) return null

  const translate = (key: string) =>
    t(`pages.counterConfiguration.sections.counterCalendar.editForm.modals.removeBreak.${key}`)

  return (
    <ConfirmationModal
      minWidth={595}
      width="30%"
      title={translate('title')}
      onCancelClick={onCancel}
      onSaveClick={onRemove}
    >
      <p className="leading-normal text-center font-semibold text-bluegray-700">{translate('description')}</p>
    </ConfirmationModal>
  )
}
