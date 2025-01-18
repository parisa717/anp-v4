import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

interface LocationCounterPreviewProps {
  counterReceptionInterval: number
  onEdit: () => void
}

export const LocationCounterPreview = ({ counterReceptionInterval, onEdit }: LocationCounterPreviewProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.counterConfiguration.sections.counterReceptionInterval.${key}`)

  return (
    <section className="flex text-shade-700 basis-1/2 bg-root-surface-card rounded h-min py-3.5 px-4 justify-between items-center">
      <p className="m-0 px-2 font-bold">{translate('slotFrequency')}</p>
      <div className="flex gap-2 items-center">
        <p className="m-0 capitalize">{t('every')}</p>
        <p className="m-0 font-semibold">{counterReceptionInterval} Minutes</p>
      </div>
      <Button
        link
        label={t('edit')}
        className="capitalize text-theme-primary"
        icon="pi pi-pencil"
        text
        iconPos="right"
        onClick={onEdit}
      />
    </section>
  )
}
