import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Link, useLocation } from 'react-router'

import { useGetWorkshopFollowUpWorksQuery } from '@/entities/followUpWork'
import { pageUrls } from '@/shared/lib'

import { useFollowUpWorksListColumns } from '../../lib/useFollowUpWorksListColumns'

export const FollowUpWorksTab = () => {
  const { data: works, isLoading, isError } = useGetWorkshopFollowUpWorksQuery()

  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.followUpWorksList.${key}`)

  const { search } = useLocation()

  const columns = useFollowUpWorksListColumns()

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return (
    <section className="flex flex-col gap-9">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-normal text-text-3xl-regular-lineheight-150 text-bluegray-700 m-0">{translate('title')}</h3>
        <Link to={pageUrls.followUpWork.add() + search}>
          <Button label={translate('addFollowUpWorkButton')} severity="secondary" outlined />
        </Link>
      </div>

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
