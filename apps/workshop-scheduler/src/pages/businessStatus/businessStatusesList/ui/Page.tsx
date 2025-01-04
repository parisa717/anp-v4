import { useTranslation } from '@nexus-ui/i18n'
import { Outlet } from 'react-router'

import { ROUTE_PATHS } from '@/shared/lib'
import { OperationMessagesList, ServerSideErrorsMessagesList } from '@/shared/ui'
import { BusinessStatusMode, StatusDataSection } from '@/widgets/StatusDataSection'

const BusinessStatusesListPage = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.businessStatus.businessStatusList.${key}`)

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>
      <OperationMessagesList className="my-9" page={ROUTE_PATHS.BusinessStatus.Root} />
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.BusinessStatus.Root} className="mb-6" />
      <section className="flex flex-row gap-4">
        <StatusDataSection isAdditionalBusinessStatus={false} mode={BusinessStatusMode.Default} />
        <StatusDataSection isAdditionalBusinessStatus mode={BusinessStatusMode.Default} />
      </section>
      <Outlet />
    </main>
  )
}

export default BusinessStatusesListPage
