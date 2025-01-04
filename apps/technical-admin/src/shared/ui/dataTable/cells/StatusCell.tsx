import { useTranslation } from '@nexus-ui/i18n'

interface StatusCellProps<T extends { isActive: boolean }> {
  data: T
}

export const StatusCell = <T extends { isActive: boolean }>({ data }: StatusCellProps<T>) => {
  const { t } = useTranslation()

  return <div className="capitalize">{data.isActive ? t('active') : t('inactive')}</div>
}
