import { useTranslation } from '@nexus-ui/i18n'
import { Outlet } from 'react-router'

import { WorksListTabs } from './worksListTabs/WorksListTabs'

const WorksListPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.${key}`)

  return (
    <main>
      <h1 className="text-headline" data-cy="works-list-page-title">
        {translate('title')}
      </h1>

      <WorksListTabs />

      <Outlet />
    </main>
  )
}

export default WorksListPage
