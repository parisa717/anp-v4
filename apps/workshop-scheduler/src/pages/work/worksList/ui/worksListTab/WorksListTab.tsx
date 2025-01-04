import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Link } from 'react-router'

import { useGetWorkshopWorksQuery } from '@/entities/work'
import { pageUrls } from '@/shared/lib'

import { useServerSideTableQuery } from '../../lib/useServerSideTableQuery'
import { useWorksListColumns } from '../../lib/useWorksListColumns'

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
  } = useServerSideTableQuery()

  const {
    data: { works, metadata },
    isLoading,
    isError,
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

  if (isError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return (
    <section className="flex flex-col gap-9 basis-1/2">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-3xl text-bluegray-700 m-0 font-normal">{translate('title')}</h3>
        <div className="flex flex-row">
          <Link to={pageUrls.work.add()}>
            <Button label={translate('addWorkButton')} severity="secondary" outlined />
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={works ?? []}
        loading={isLoading}
        emptyMessage={translate('table.empty')}
        filterDisplay="row"
        scrollable
        scrollHeight="calc(100vh - 391px)"
        lazy
        paginator
        rows={pageSize}
        rowsPerPageOptions={[10, 25, 50]}
        totalRecords={metadata?.totalResults ?? 0}
        first={page * pageSize}
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
