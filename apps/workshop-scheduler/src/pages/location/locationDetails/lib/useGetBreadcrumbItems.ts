import { useTranslation } from '@nexus-ui/i18n'
import { useNavigate, useParams } from 'react-router'

import { IdParam, pageUrls } from '@/shared/lib'

export const useGetBreadcrumbItems = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams<IdParam>()
  const navigate = useNavigate()
  const translate = (key: string) => t(`pages.location.${key}`)

  const items = [
    {
      label: translate('locationsList.title'),
      command: () => navigate(pageUrls.location.root()),
    },
    {
      label: translate('locationDetails.title'),
      command: () => navigate(pageUrls.location.details.root(id)),
    },
  ]

  return items
}
