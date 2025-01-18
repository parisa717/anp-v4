import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

import { DataTable } from '../DataTable'
import { Brand, clientMockData } from './mockData'

export const Default = () => {
  const columns = [{ field: 'name', header: 'Name' }, { field: 'isActive', header: 'Status' }, { field: 'details' }]

  return <DataTable<Brand[]> columns={columns} data={clientMockData} />
}

export const WithCustomCellTemplate = () => {
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

  return <DataTable columns={columns} data={clientMockData} />
}

export const WithSorting = () => {
  const columns: ColumnProps[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'isActive', header: 'Status', sortable: true },
    { field: 'details' },
  ]

  return <DataTable columns={columns} data={clientMockData} removableSort />
}

export const WithFiltering = () => {
  const filters = {
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

  return <DataTable<Brand[]> columns={columns} data={clientMockData} filters={filters} filterDisplay="row" />
}
