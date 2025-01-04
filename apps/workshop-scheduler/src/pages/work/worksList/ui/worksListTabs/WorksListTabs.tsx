import { useTranslation } from '@nexus-ui/i18n'
import { Tabs } from '@nexus-ui/ui'
import { TabViewTabChangeEvent } from 'primereact/tabview'
import { useSearchParams } from 'react-router'

import { FollowUpWorksTab } from '../followUpWorksTab/FollowUpWorksTab'
import { WorksListTab } from '../worksListTab/WorksListTab'

export const WorksListTabs = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.${key}`)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleTabChange = ({ index }: TabViewTabChangeEvent) => {
    setSearchParams(
      { tab: tabItems[index].id },
      {
        replace: true,
      },
    )
  }

  const tabItems = [
    {
      id: 'worksList',
      header: translate('tabs.worksList.title'),
      children: <WorksListTab />,
    },
    {
      id: 'followUpWorks',
      header: translate('tabs.followUpWorks.title'),
      children: <FollowUpWorksTab />,
    },
  ]

  const activeTabIndex =
    tabItems.findIndex(({ id }) => id === searchParams.get('tab')) > -1
      ? tabItems.findIndex(({ id }) => id === searchParams.get('tab'))
      : 0

  return <Tabs items={tabItems} activeIndex={activeTabIndex} onTabChange={handleTabChange} />
}
