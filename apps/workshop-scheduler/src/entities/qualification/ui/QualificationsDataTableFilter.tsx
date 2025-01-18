import { DataTableMultiSelect } from '@nexus-ui/ui'
import { MultiSelectProps } from 'primereact/multiselect'

import { useGetQualificationsQuery } from '../api/qualificationApi'

export const QualificationsDataTableFilter = (props?: Partial<MultiSelectProps>) => {
  const { data: brands, isLoading } = useGetQualificationsQuery()

  return DataTableMultiSelect({
    options: brands,
    loading: isLoading,
    optionLabel: 'name',
    optionValue: 'id',
    maxSelectedLabels: 1,
    ...props,
  })
}
