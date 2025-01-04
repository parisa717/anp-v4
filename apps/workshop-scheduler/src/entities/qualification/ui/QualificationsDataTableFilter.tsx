import { DataTableMultiSelect } from '@nexus-ui/ui'
import { MultiSelectProps } from 'primereact/multiselect'

import { useGetQualificationsQuery } from '../api/qualificationApi'

export const QualificationsDataTableFilter = (props?: Partial<MultiSelectProps>) => {
  const { data: brands, isError, isLoading } = useGetQualificationsQuery()

  if (isError) {
    //TODO: Add proper error handling
    console.error('Error fetching qualifications')
  }

  return DataTableMultiSelect({
    options: brands,
    loading: isLoading,
    optionLabel: 'name',
    optionValue: 'id',
    maxSelectedLabels: 1,
    ...props,
  })
}
