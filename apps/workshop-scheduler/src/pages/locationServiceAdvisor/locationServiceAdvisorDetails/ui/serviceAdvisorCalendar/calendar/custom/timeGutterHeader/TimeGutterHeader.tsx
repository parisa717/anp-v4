import { useTranslation } from '@nexus-ui/i18n'

export const TimeGutterHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="h-full w-full flex items-end justify-center bg-shade-000">
      <p className="text-shade-700 text-sm">{t('calendar.allDay')}</p>
    </div>
  )
}
