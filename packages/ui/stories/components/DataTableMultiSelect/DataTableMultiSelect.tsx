import merge from 'lodash/merge'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'
import {
  MultiSelect,
  MultiSelectChangeEvent,
  MultiSelectPassThroughOptions,
  MultiSelectProps,
} from 'primereact/multiselect'

export const DataTableMultiSelect = ({ pt, ...props }: MultiSelectProps) => {
  const defaultPt: MultiSelectPassThroughOptions = {
    input: {
      className: 'capitalize',
    },
    trigger: {
      className: 'text-input-icon',
    },
    clearIcon: {
      className: 'text-input-icon',
    },
    closeIcon: {
      className: 'text-input-icon',
    },
    list: {
      className: 'capitalize',
    },
  }

  const mergedPt = merge(defaultPt, pt || {})

  return function filterElement({ value, filterApplyCallback }: ColumnFilterElementTemplateOptions) {
    return (
      <MultiSelect
        pt={mergedPt}
        value={value}
        onChange={(e: MultiSelectChangeEvent) => filterApplyCallback(e.value)}
        showClear
        {...props}
      />
    )
  }
}
