import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

interface FooterProps {
  onBack: () => void
  onSave: () => void
  isUpdating: boolean
}

export const Footer = ({ onBack, onSave, isUpdating }: FooterProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.assignLocations.${key}`)

  return (
    <section className="flex justify-between items-center">
      <Button
        severity="secondary"
        outlined
        label={translate('back')}
        onClick={onBack}
        className="capitalize"
        loading={isUpdating}
      />
      <Button label={translate('save')} onClick={onSave} autoFocus className="capitalize mr-0" loading={isUpdating} />
    </section>
  )
}
