import { useTranslation } from '@nexus-ui/i18n'
import { DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode, FilterService } from 'primereact/api'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { Link } from 'react-router'

import { BrandsDataTableFilter } from '@/entities/brand'
import { BrandsTagsCellTemplate, LocationEntity } from '@/entities/location'
import { pageUrls } from '@/shared/lib'

// Custom filtering is enabled by defining a filter function using FilterService.register where the rule argument must be "custom_[field]" and the filter match mode of the field must be FilterMatchMode.CUSTOM. https://primereact.org/datatable/#custom_filter
FilterService.register('custom_brands', (brands: LocationEntity['brands'], filterValue: string[]) => {
  if (!filterValue || !brands) return true
  if (filterValue.length === 0) return true
  return brands.some(({ id }) => filterValue.includes(id))
})

export const useColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.location.locationsList.table.${key}`)

  const linkTemplate = (entity: LocationEntity) => {
    return (
      <Link to={pageUrls.location.details.root(entity.id)}>
        <Button
          link
          label={t('edit')}
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
      field: 'area.code',
      header: translate('columnHeaders.areaId'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'code',
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
      filterElement: BrandsDataTableFilter(),
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
      body: linkTemplate,
      pt: {
        headerCell: {
          className: 'min-w-64',
        },
        bodyCell: {
          className: 'text-end min-w-64',
        },
      },
    },
  ]

  return columns
}
