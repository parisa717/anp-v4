import clsx from 'clsx'
import { FilterMatchMode } from 'primereact/api'
import { ColumnProps } from 'primereact/column'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { MultiSelectProps } from 'primereact/multiselect'

import { DataTableMultiSelect } from '../../DataTableMultiSelect/DataTableMultiSelect'
import { DataTableSearchInput } from '../../DataTableSearchInput/DataTableSearchInput'
import { StoryMockWorkEntity } from './types'

export const StoryBrandsDataTableFilter = (props?: Partial<MultiSelectProps>) => {
  return DataTableMultiSelect({
    options: [
      {
        id: 'brand_1',
        name: 'Opel',
      },
      {
        id: 'brand_2',
        name: 'BMW',
      },
      {
        id: 'brand_3',
        name: 'Mercedes',
      },
      {
        id: 'brand_4',
        name: 'Audi',
      },
    ],
    loading: false,
    optionLabel: 'name',
    optionValue: 'id',
    maxSelectedLabels: 1,
    ...props,
  })
}

export const StoryQualificationsDataTableFilter = (props?: Partial<MultiSelectProps>) => {
  return DataTableMultiSelect({
    options: [
      {
        id: '1',
        name: 'Mechanics',
      },
      {
        id: '2',
        name: 'Brake and Transmission Technicians',
      },
      {
        id: '3',
        name: 'Electrical Systems Technicians',
      },
    ],
    loading: false,
    optionLabel: 'name',
    optionValue: 'id',
    maxSelectedLabels: 1,
    ...props,
  })
}

type DataTableCheckedDropdownProps = {
  value: boolean
  onChange: (e: DropdownChangeEvent) => void
}

export const StoryDataTableCheckedDropdown = ({ value, onChange }: DataTableCheckedDropdownProps) => {
  return (
    <Dropdown
      value={value}
      placeholder="select"
      options={[
        { value: true, label: 'checked', className: 'capitalize' },
        { value: false, label: 'unchecked', className: 'capitalize' },
      ]}
      onChange={onChange}
      showClear
      pt={{
        input: {
          className: 'capitalize',
        },
      }}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStoryDataTableColumns = () => {
  const workBrandNamesTemplate = (cellData: StoryMockWorkEntity) => {
    return (
      <div className="flex flex-col">
        {cellData.brands.map((brand, index) => (
          <div
            key={`${cellData.id}-${brand.id}-${brand.name}`}
            className={clsx(
              'p-4',
              index !== cellData.brands.length - 1 && 'border-0 border-solid border-b-table-footer-cell',
            )}
          >
            {brand.name}
          </div>
        ))}
      </div>
    )
  }

  const workBrandTimeUnitsTemplate = (cellData: StoryMockWorkEntity) => {
    return (
      <div className="flex flex-col">
        {cellData.brands.map((brand, index) => (
          <div
            key={`${cellData.id}-${brand.id}-${brand.timeUnits}`}
            className={clsx(
              'p-4',
              index !== cellData.brands.length - 1 && 'border-0 border-solid border-b-table-footer-cell',
            )}
          >
            {brand.timeUnits}
          </div>
        ))}
      </div>
    )
  }

  const isDescriptionEditableTemplate = (entity: StoryMockWorkEntity) => {
    return entity.isDescriptionEditable ? (
      <i className="pi pi-check text-theme-primary size-6" />
    ) : (
      <i className="pi pi-times text-surface-900 size-6" />
    )
  }

  const isCapacityEditableTemplate = (entity: StoryMockWorkEntity) => {
    return entity.isCapacityEditable ? (
      <i className="pi pi-check text-theme-primary size-6" />
    ) : (
      <i className="pi pi-times text-surface-900 size-6" />
    )
  }

  const columns: ColumnProps[] = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        headerCell: {
          className: 'text-center min-w-[296px]',
        },
        bodyCell: {
          className: 'align-top',
        },
      },
    },
    {
      field: 'brand',
      header: 'Brands',
      body: workBrandNamesTemplate,
      sortable: false,
      filter: true,
      filterElement: StoryBrandsDataTableFilter(),
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        headerCell: {
          className: 'min-w-64',
        },
        bodyCell: {
          className: 'p-0 min-w-64',
        },
      },
    },
    {
      field: 'brands.timeUnits',
      header: 'Time units',
      body: workBrandTimeUnitsTemplate,
      sortable: false,
      filter: false,
      pt: {
        bodyCell: {
          className: 'p-0 min-w-32',
        },
      },
    },
    {
      field: 'qualification',
      header: 'Qualification',
      body: (cellData: StoryMockWorkEntity) => cellData.qualification.name,
      sortable: true,
      filter: true,
      filterElement: StoryQualificationsDataTableFilter(),
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        headerCell: {
          className: 'text-center min-w-[296px]',
        },
        bodyCell: {
          className: 'align-top',
        },
      },
    },
    {
      field: 'isDescriptionEditable',
      body: isDescriptionEditableTemplate,
      header: 'Is editable',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.EQUALS,
      filterElement: (options) => (
        <StoryDataTableCheckedDropdown value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
      ),
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        headerCell: {
          className: 'text-center min-w-[176px]',
        },
        bodyCell: {
          className: 'text-center align-top pt-8',
        },
      },
    },
    {
      field: 'isCapacityEditable',
      body: isCapacityEditableTemplate,
      header: 'capacity editable',
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.EQUALS,
      filterElement: (options) => (
        <StoryDataTableCheckedDropdown value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
      ),
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        headerCell: {
          className: 'text-center min-w-[176px]',
        },
        bodyCell: {
          className: 'text-center align-top pt-8',
        },
      },
    },
  ]

  return columns
}
