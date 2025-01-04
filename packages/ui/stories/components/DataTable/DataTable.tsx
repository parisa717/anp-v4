import { Column, ColumnProps } from 'primereact/column'
import {
  DataTable as PrimeDataTable,
  DataTableProps as PrimeDataTableProps,
  DataTableValueArray,
} from 'primereact/datatable'

type DataTableProps<T extends DataTableValueArray> = PrimeDataTableProps<T> & {
  columns: ColumnProps[]
  data: T
}

export const DataTable = <T extends DataTableValueArray>({ columns, data, ...otherProps }: DataTableProps<T>) => {
  return (
    <PrimeDataTable<T> value={data} {...otherProps} data-cy="data-table">
      {columns.map((columnProps) => (
        <Column key={String(columnProps.field)} headerClassName="bg-table-header-cell" {...columnProps} />
      ))}
    </PrimeDataTable>
  )
}
