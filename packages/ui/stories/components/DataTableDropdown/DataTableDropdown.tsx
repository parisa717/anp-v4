import merge from 'lodash/merge'
import { ColumnFilterElementTemplateOptions } from 'primereact/column'
import { Dropdown, DropdownChangeEvent, DropdownPassThroughOptions, DropdownProps } from 'primereact/dropdown'

export const DataTableDropdown = ({ pt, ...props }: DropdownProps) => {
  const defaultPt: DropdownPassThroughOptions = {
    root: {
      'data-cy': 'datatable-dropdown',
    },
    input: {
      'data-cy': 'datatable-dropdown-input',
      className: 'capitalize',
    },
    trigger: {
      'data-cy': 'datatable-dropdown-trigger',
      className: 'text-input-icon',
    },
    clearIcon: {
      className: 'text-input-icon',
    },
    list: {
      className: 'capitalize',
    },
    itemLabel: {
      'data-cy': 'datatable-dropdown-item-label',
    },
  }

  const mergedPt = merge(defaultPt, pt || {})

  return function filterElement({ value, filterApplyCallback }: ColumnFilterElementTemplateOptions) {
    return (
      <Dropdown
        pt={mergedPt}
        value={value}
        onChange={(e: DropdownChangeEvent) => filterApplyCallback(e.value)}
        showClear
        {...props}
      />
    )
  }
}
