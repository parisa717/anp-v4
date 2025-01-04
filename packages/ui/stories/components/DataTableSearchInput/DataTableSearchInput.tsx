import { ColumnFilterElementTemplateOptions } from 'primereact/column'

import { SearchInput } from '../SearchInput'

interface DataTableSearchInputProps extends Pick<ColumnFilterElementTemplateOptions, 'value' | 'filterApplyCallback'> {}

export const DataTableSearchInput = ({ value, filterApplyCallback }: DataTableSearchInputProps) => {
  return <SearchInput value={value ?? ''} onSearch={(query) => filterApplyCallback(query)} />
}
