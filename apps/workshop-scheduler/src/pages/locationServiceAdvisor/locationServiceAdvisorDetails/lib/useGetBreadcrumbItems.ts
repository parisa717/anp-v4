import { useTranslation } from '@nexus-ui/i18n'
import { useNavigate, useParams } from 'react-router'

import { IdParam, pageUrls } from '@/shared/lib'

export const useGetBreadcrumbItems = () => {
  const { t } = useTranslation()
  const { id = '' } = useParams<IdParam>()
  const navigate = useNavigate()
  const translate = (key: string) => t(`pages.locationServiceAdvisor.${key}`)

  const items = [
    {
      label: translate('title'),
      command: () => navigate(pageUrls.locationServiceAdvisor.root()),
    },
    {
      label: translate('details.breadcrumbTitle'),
      command: () => navigate(pageUrls.locationServiceAdvisor.details(id)),
    },
  ]

  return items
}
