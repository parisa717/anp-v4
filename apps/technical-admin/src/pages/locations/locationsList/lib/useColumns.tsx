import { DataTableDropdown, DataTableMultiSelect, DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode, FilterService } from 'primereact/api'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { useGetBrandsQuery } from '@/entities/brand'
import { BrandsTagsCellTemplate, LocationEntity } from '@/entities/location'
import { pageUrls } from '@/shared/lib'

FilterService.register('custom_brands', (brands: LocationEntity['brands'], filterValue: string[]) => {
  if (!filterValue || !brands) return true
  if (filterValue.length === 0) return true
  return brands.some(({ id }) => filterValue.includes(id))
})


export const useColumns = () => {
  const { t } = useTranslation()
  
  const { data: brands, isError, isLoading } = useGetBrandsQuery()

  const statusOptions = [
    {
      label: t('active'),
      value: true,
    },
    {
      label: t('inactive'),
      value: false,
    },
  ]
  if (isError) {
    //TODO: Add proper error handling
    console.error('Error fetching brands')
  }

  const translate = (key: string) => t(`pages.locations.locationsList.table.${key}`)

  const linkTemplate = (entity: LocationEntity) => {
    return (
      <Link to={pageUrls.locations.edit(entity.id)}>
        <Button
          link
          label={'Bearbeiten'}
          className="capitalize text-theme-primary"
          icon="pi pi-pencil"
          text
          iconPos="right"
        />
      </Link>
    )
  }
  const columns: ColumnProps[] = [
    {
      field: 'area.id',
      header: translate('columnHeaders.areaId'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'id',
      header: translate('columnHeaders.locationId'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'name',
      header: translate('columnHeaders.locationName'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'brands',
      filterMatchMode: FilterMatchMode.CUSTOM,
      header: translate('columnHeaders.brand'),
      sortable: true,
      filter: true,
      filterElement: DataTableMultiSelect({
        options: brands,
        loading: isLoading,
        optionLabel: 'code',
        optionValue: 'id',
        maxSelectedLabels: 1,
      }),
      showFilterMenu: false,
      showClearButton: false,
      body: BrandsTagsCellTemplate,
      pt: {
        headerCell: {
          className: 'min-w-64',
        },
      },
    },
    {
      field: 'address.postCode',
      header: translate('columnHeaders.zipCode'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.city',
      header: translate('columnHeaders.city'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.address',
      header: translate('columnHeaders.address'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.country.name',
      header: translate('columnHeaders.country'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },

    {
      field: 'isActive',
      filterMatchMode: FilterMatchMode.EQUALS,
      header: 'Status',
      body: (location: LocationEntity) => (
        <Dropdown
          className="capitalize"
          pt={{
            trigger: {
              'data-cy': 'datatable-dropdown-trigger',
              className: 'text-input-icon',
            },
          }}
          value={location.isActive}
          options={statusOptions}
        />
      ),
      sortable: true,
      filter: true,
      filterElement: DataTableDropdown({
        options: [
          {
            label: t('active'),
            value: true,
          },
          {
            label: t('inactive'),
            value: false,
          },
        ],
        optionLabel: 'label',
        optionValue: 'value',
      }),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: linkTemplate,
      pt: {
        bodyCell: {
          className: 'text-end ',
        },
      },
    },
  ]

  return columns
}
