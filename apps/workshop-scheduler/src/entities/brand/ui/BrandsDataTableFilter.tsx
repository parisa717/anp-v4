import { DataTableMultiSelect } from '@nexus-ui/ui'
import { MultiSelectProps } from 'primereact/multiselect'

import { useGetBrandsQuery } from '../api/brandApi'

export const BrandsDataTableFilter = (props?: Partial<MultiSelectProps>) => {
  const { data: brands, isError, isLoading } = useGetBrandsQuery()

  if (isError) {
    //TODO: Add proper error handling
    console.error('Error fetching brands')
  }

  return DataTableMultiSelect({
    options: brands,
    loading: isLoading,
    optionLabel: 'code',
    optionValue: 'id',
    maxSelectedLabels: 1,
    ...props,
  })
}
