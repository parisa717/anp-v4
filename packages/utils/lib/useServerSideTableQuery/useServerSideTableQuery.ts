import { DataTableFilterEvent, DataTablePageEvent, DataTableSortEvent } from 'primereact/datatable'
import { useState } from 'react'

import { PrimeReactFiltersDefs } from '../sharedTypes'
import { SortDirection } from '../sharedTypes/serverSideTableQueryTypes'

export const DEFAULT_PAGINATION_PAGE_SIZE = 10

const transformFilters = (filters: PrimeReactFiltersDefs) => {
  const transformedFilters: Record<string, unknown> = {}

  Object.entries(filters).forEach(([key, filter]) => {
    if (filter.value !== null && filter.value !== undefined && filter.value !== '') {
      transformedFilters[key] = filter.value
    }
  })

  return transformedFilters
}

type UseServerSideTableQueryConfig = {
  initialFilters: PrimeReactFiltersDefs
  initialPageSize?: number
  initialSortField?: string
}

export const useServerSideTableQuery = (config: UseServerSideTableQueryConfig) => {
  const { initialFilters = {}, initialPageSize = DEFAULT_PAGINATION_PAGE_SIZE, initialSortField = '' } = config

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sortField, setSortField] = useState<string>(initialSortField)
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1>(0)
  const [filters, setFilters] = useState<PrimeReactFiltersDefs>(initialFilters)

  const queryParams = {
    filter: transformFilters(filters),
    sort: {
      direction: sortOrder === 1 ? SortDirection.Asc : SortDirection.Desc,
      field: sortField,
    },
    pagination: {
      limit: pageSize,
      offset: page * pageSize,
    },
  }

  const handleSortChange = (event: DataTableSortEvent) => {
    if (event.sortField) {
      setSortField(event.sortField)
    }
    if (event.sortOrder !== undefined && event.sortOrder !== null) {
      setSortOrder(event.sortOrder)
    }
    setPage(0)
  }

  const handlePageChange = (event: DataTablePageEvent) => {
    if (typeof event.page !== 'undefined') {
      setPage(event.page)
    }

    if (typeof event.rows !== 'undefined') {
      setPageSize(event.rows)
    }
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

  return {
    filters,
    page,
    pageSize,
    sortField,
    sortOrder,
    handleSortChange,
    handlePageChange,
    handleFilterChange,
    queryParams,
  }
}
