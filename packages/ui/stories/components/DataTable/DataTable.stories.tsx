import type { Meta, StoryObj } from '@storybook/react'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { DataTableBaseProps } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

import { DataTable } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'DataTable',
  component: DataTable,
}

export default meta

type Story = StoryObj<typeof DataTable>

interface Brand {
  id: number
  name: string
  isActive: boolean
}

const data = [
  { id: 1, name: 'Opel', isActive: true },
  { id: 2, name: 'Kia', isActive: false },
  { id: 3, name: 'Nissan', isActive: true },
]

const DefaultStoryComponent = () => {
  const columns = [{ field: 'name', header: 'Name' }, { field: 'isActive', header: 'Status' }, { field: 'details' }]

  return <DataTable<Brand[]> columns={columns} data={data} />
}

export const Default: Story = {
  render: DefaultStoryComponent,
}

const WithCustomCellTemplateStoryComponent = () => {
  const brandNameTemplate = (brand: Brand) => {
    return <div className="uppercase">{brand.name}</div>
  }

  const statusTemplate = (brand: Brand) => {
    return <div>{brand.isActive ? 'Active' : 'Inactive'}</div>
  }

  const detailsButtonTemplate = () => {
    return <Button label="Details" icon="pi pi-chevron-right" text iconPos="right" />
  }

  const columns: ColumnProps[] = [
    { field: 'name', header: 'Name', body: brandNameTemplate },
    { field: 'isActive', header: 'Status', body: statusTemplate },
    { field: 'details', body: detailsButtonTemplate },
  ]

  return <DataTable columns={columns} data={data} />
}

export const WithCustomCellTemplate: Story = {
  render: WithCustomCellTemplateStoryComponent,
}

const WithSortingStoryComponent = () => {
  const columns: ColumnProps[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'isActive', header: 'Status', sortable: true },
    { field: 'details' },
  ]

  return <DataTable columns={columns} data={data} removableSort />
}

export const WithSorting: Story = {
  render: WithSortingStoryComponent,
}

const WithFilteringStoryComponent = () => {
  const filters: DataTableBaseProps<Brand[]>['filters'] = {
    name: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    isActive: {
      value: null,
      matchMode: FilterMatchMode.EQUALS,
    },
  }

  const statusTemplate = (brand: Brand) => {
    return <>{brand.isActive ? 'Active' : 'Inactive'}</>
  }

  const detailsButtonTemplate = () => {
    return <Button label="Details" icon="pi pi-chevron-right" text iconPos="right" />
  }

  const columns: ColumnProps[] = [
    {
      field: 'name',
      header: 'Name',
      className: 'w-[65%]',
      filter: true,
      filterField: 'name',
      showFilterMenu: false,
      pt: {
        headerFilterClearButton: {
          className: 'hidden',
        },
      },
      filterElement: (options) => (
        <IconField className="max-w-72">
          <InputIcon className="pi pi-search" />
          <InputText
            name={options.field}
            value={options.value ?? ''}
            onChange={(e) => options.filterApplyCallback(e.target.value)}
          />
        </IconField>
      ),
    },
    {
      field: 'isActive',
      header: 'Status',
      body: statusTemplate,
      filter: true,
      filterField: 'isActive',
      showFilterMenu: false,
      pt: {
        headerFilterClearButton: {
          className: 'hidden',
        },
      },
      filterElement: (options) => (
        <Dropdown
          value={options.value}
          options={[
            {
              label: 'Active',
              value: true,
            },
            {
              label: 'Inactive',
              value: false,
            },
          ]}
          onChange={(e) => options.filterApplyCallback(e.value)}
          showClear
          className="max-w-40"
        />
      ),
    },
    {
      field: 'details',
      body: detailsButtonTemplate,
    },
  ]

  return <DataTable<Brand[]> columns={columns} data={data} filters={filters} filterDisplay="row" />
}

export const WithFiltering: Story = {
  render: WithFilteringStoryComponent,
}
