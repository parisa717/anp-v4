import { PrimeReactFiltersDefs } from '@nexus-ui/utils'
import { Column, ColumnProps } from 'primereact/column'
import {
  DataTable as PrimeDataTable,
  DataTableFilterEvent,
  DataTablePageEvent,
  DataTableProps as PrimeDataTableProps,
  DataTableSortEvent,
  DataTableValueArray,
} from 'primereact/datatable'

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50]

type BaseDataTableProps<T extends DataTableValueArray> = {
  columns: ColumnProps[]
  data: T
}

type ClientSideProps = {
  mode?: 'client'
}

type ServerSideProps = {
  mode: 'server'
  totalRecords: number
  loading: boolean
  page: number
  pageSize: number
  sortField: string
  sortOrder: 1 | 0 | -1 | null | undefined
  filters: PrimeReactFiltersDefs
  onPage: (event: DataTablePageEvent) => void
  onSort: (event: DataTableSortEvent) => void
  onFilter: (event: DataTableFilterEvent) => void
}

export type DataTableProps<T extends DataTableValueArray> = BaseDataTableProps<T> &
  PrimeDataTableProps<T> &
  (ClientSideProps | ServerSideProps)

export const DataTable = <T extends DataTableValueArray>(props: DataTableProps<T>) => {
  const { columns, data, ...otherProps } = props

  if (props.mode === 'server') {
    const {
      totalRecords,
      loading,
      page,
      pageSize,
      sortField,
      sortOrder,
      filters,
      onPage,
      onSort,
      onFilter,
      rowsPerPageOptions,
      ...restProps
    } = props

    return (
      <PrimeDataTable<T>
        value={data}
        lazy
        paginator
        totalRecords={totalRecords}
        loading={loading}
        first={page * pageSize}
        rows={pageSize}
        rowsPerPageOptions={rowsPerPageOptions ?? DEFAULT_ROWS_PER_PAGE_OPTIONS}
        sortField={sortField}
        sortOrder={sortOrder}
        filters={filters}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        {...restProps}
      >
        {columns.map((columnProps) => (
          <Column key={String(columnProps.field)} headerClassName="bg-table-header-cell" {...columnProps} />
        ))}
      </PrimeDataTable>
    )
  }

  return (
    <PrimeDataTable<T> value={data} {...otherProps} data-cy="data-table">
      {columns.map((columnProps) => (
        <Column key={String(columnProps.field)} headerClassName="bg-table-header-cell" {...columnProps} />
      ))}
    </PrimeDataTable>
  )
}
