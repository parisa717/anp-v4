import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router'

interface DetailsButtonCellProps<T extends { id: string }> {
  data: T
  pageUrl: (id: string) => string
}

export const DetailsButtonCell = <T extends { id: string }>({ data, pageUrl }: DetailsButtonCellProps<T>) => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <Button
      link
      label={t('details')}
      className="capitalize"
      icon="pi pi-chevron-right"
      text
      iconPos="right"
      onClick={() => navigate(pageUrl(data.id))}
    />
  )
}
