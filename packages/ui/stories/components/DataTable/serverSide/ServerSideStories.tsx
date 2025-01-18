import { PrimeReactFiltersDefs } from '@nexus-ui/utils'
import { FilterMatchMode } from 'primereact/api'
import { DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent } from 'primereact/datatable'
import { useCallback, useEffect, useState } from 'react'

import { DataTable } from '../../../components/DataTable'
import { useStoryDataTableColumns } from './columns'
import { mockWorks } from './mockData'
import { StoryMockWorkEntity } from './types'
import { mockServerSideOperations, transformWorkToEntity } from './utils'

const initialFilters = {
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  brand: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qualification: { value: null, matchMode: FilterMatchMode.CONTAINS },
  isDescriptionEditable: { value: null, matchMode: FilterMatchMode.EQUALS },
  isCapacityEditable: { value: null, matchMode: FilterMatchMode.EQUALS },
}

export const WithServerSideData = () => {
  const columns = useStoryDataTableColumns()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<StoryMockWorkEntity[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1>(0)
  const [filters, setFilters] = useState<PrimeReactFiltersDefs>(initialFilters)

  const loadData = useCallback(async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredData = mockServerSideOperations.filterWorks(mockWorks, filters)

    if (sortField) {
      filteredData = mockServerSideOperations.sortWorks(filteredData, sortField, sortOrder)
    }

    const { works: paginatedWorks, totalResults } = mockServerSideOperations.paginateWorks(filteredData, page, pageSize)

    setData(paginatedWorks.map(transformWorkToEntity))
    setTotalRecords(totalResults)
    setLoading(false)
  }, [filters, page, pageSize, sortField, sortOrder])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handlePageChange = (event: DataTablePageEvent) => {
    setPage(event.page ?? 0)
    setPageSize(event.rows ?? 10)
  }

  const handleSortChange = (event: DataTableSortEvent) => {
    setSortField(event.sortField ?? '')
    setSortOrder(event.sortOrder ?? 0)
    setPage(0)
  }

  const handleFilterChange = (event: DataTableFilterEvent) => {
    const newFilters: PrimeReactFiltersDefs = {}

    Object.entries(event.filters).forEach(([key, value]) => {
      if ('operator' in value) {
        return
      }

      newFilters[key] = {
        value: value.value,
        matchMode: value.matchMode,
      }
    })

    setFilters(newFilters)
    setPage(0)
  }

  return (
    <DataTable
      mode="server"
      columns={columns}
      data={data}
      loading={loading}
      totalRecords={totalRecords}
      page={page}
      pageSize={pageSize}
      sortField={sortField}
      sortOrder={sortOrder}
      filters={filters}
      onPage={handlePageChange}
      onSort={handleSortChange}
      onFilter={handleFilterChange}
      filterDisplay="row"
      paginator
      rows={pageSize}
      rowsPerPageOptions={[5, 10, 25, 50]}
    />
  )
}
