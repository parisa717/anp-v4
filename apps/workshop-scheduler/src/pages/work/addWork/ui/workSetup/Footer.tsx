import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

interface ModalFooterProps {
  onCancel: () => void
  onNext: () => void
  onSkipAndSave: () => void
  isUpdating: boolean
}

export const Footer = ({ onCancel, onNext, onSkipAndSave, isUpdating }: ModalFooterProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.workSetupForm.${key}`)

  return (
    <section className="flex justify-between items-center">
      <Button
        severity="secondary"
        outlined
        label={translate('cancelButton')}
        onClick={onCancel}
        className="capitalize"
        loading={isUpdating}
      />
      <div className="flex gap-2">
        <Button
          severity="secondary"
          outlined
          label={translate('skipAndSaveButton')}
          onClick={onSkipAndSave}
          className="capitalize"
          loading={isUpdating}
        />
        <Button
          label={translate('nextButton')}
          onClick={onNext}
          autoFocus
          className="capitalize mr-0"
          loading={isUpdating}
        />
      </div>
    </section>
  )
}
