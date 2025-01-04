import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

type DeleteEntityButtonProps = {
  onDelete: () => void
  isLoading: boolean
}

export const DeleteEntityButton = ({ onDelete, isLoading }: DeleteEntityButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button
      onClick={onDelete}
      link
      label={t('delete')}
      className="capitalize text-theme-primary"
      icon="pi pi-trash"
      text
      iconPos="right"
      disabled={isLoading}
    />
  )
}
