import {
  DataTableFilterEvent,
  DataTableFilterMetaData,
  DataTablePageEvent,
  DataTableSortEvent,
} from 'primereact/datatable'
import { useState } from 'react'

import { SortDirection } from '@/shared/api/types.generated'
import { DEFAULT_PAGINATION_PAGE_SIZE } from '@/shared/lib'

type PrimeReactFiltersDefs = Record<string, DataTableFilterMetaData>

const transformFilters = (filters: PrimeReactFiltersDefs) => {
  const transformedFilters: Record<string, unknown> = {}

  Object.entries(filters).forEach(([key, filter]) => {
    if (filter.value !== null && filter.value !== undefined && filter.value !== '') {
      transformedFilters[key] = filter.value
    }
  })

  return transformedFilters
}

export const useServerSideTableQuery = (initialPageSize = DEFAULT_PAGINATION_PAGE_SIZE) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sortField, setSortField] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<0 | 1 | -1>(0)

  const [filters, setFilters] = useState<PrimeReactFiltersDefs>({
    name: { value: '', matchMode: 'contains' },
    brand: { value: '', matchMode: 'contains' },
    qualification: { value: '', matchMode: 'contains' },
    isCapacityEditable: { value: null, matchMode: 'equals' },
    isDescriptionEditable: { value: null, matchMode: 'equals' },
  })

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
