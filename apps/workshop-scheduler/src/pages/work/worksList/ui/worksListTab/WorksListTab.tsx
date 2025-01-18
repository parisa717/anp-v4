import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { useServerSideTableQuery } from '@nexus-ui/utils'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Link } from 'react-router'

import { useGetWorkshopWorksQuery } from '@/entities/work'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { useWorksListColumns } from '../../lib/useWorksListColumns'

const initialFilters = {
  name: { value: '', matchMode: FilterMatchMode.CONTAINS },
  brand: { value: '', matchMode: FilterMatchMode.CONTAINS },
  qualification: { value: '', matchMode: FilterMatchMode.CONTAINS },
  isCapacityEditable: { value: null, matchMode: FilterMatchMode.EQUALS },
  isDescriptionEditable: { value: null, matchMode: FilterMatchMode.EQUALS },
}

export const WorksListTab = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.worksList.${key}`)

  const columns = useWorksListColumns()

  const {
    queryParams,
    page,
    pageSize,
    filters,
    sortField,
    sortOrder,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
  } = useServerSideTableQuery({
    initialFilters,
  })

  const {
    data: { works, metadata },
    isLoading,
  } = useGetWorkshopWorksQuery(queryParams, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data
        ? {
            works: result.data.works,
            metadata: result.data.metadata,
          }
        : { works: [], metadata: { totalResults: 0 } },
    }),
  })

  return (
    <section className="flex flex-col gap-9 basis-1/2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-normal text-text-3xl-regular-lineheight-150 text-bluegray-700 m-0">{translate('title')}</h3>
        <Link to={pageUrls.work.add()}>
          <Button label={translate('addWorkButton')} severity="secondary" outlined />
        </Link>
      </div>
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.Work.Root} className="mb-8" />
      <DataTable
        mode="server"
        columns={columns}
        data={works ?? []}
        loading={isLoading}
        emptyMessage={translate('table.empty')}
        filterDisplay="row"
        scrollable
        scrollHeight="calc(100vh - 391px)"
        page={page}
        pageSize={pageSize}
        totalRecords={metadata?.totalResults ?? 0}
        onPage={handlePageChange}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSortChange}
        filters={filters}
        onFilter={handleFilterChange}
      />
    </section>
  )
}
