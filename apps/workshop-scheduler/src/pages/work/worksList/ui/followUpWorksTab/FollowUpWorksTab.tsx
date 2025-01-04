import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'

import { useGetWorkshopFollowUpWorksQuery } from '@/entities/followUpWork'

import { useFollowUpWorksListColumns } from '../../lib/useFollowUpWorksListColumns'

export const FollowUpWorksTab = () => {
  const { data: works, isLoading, isError } = useGetWorkshopFollowUpWorksQuery()

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.followUpWorksList.${key}`)

  const columns = useFollowUpWorksListColumns()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return (
    <section className="flex flex-col gap-9">
      <h3 className="text-3xl text-bluegray-700 m-0 font-normal">{translate('title')}</h3>

      <DataTable
        removableSort
        columns={columns}
        data={works ?? []}
        loading={isLoading}
        emptyMessage={translate('table.empty')}
        scrollable
        scrollHeight="calc(100vh - 391px)"
      />
    </section>
  )
}
