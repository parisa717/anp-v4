import { useTranslation } from '@nexus-ui/i18n'
import { DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode, FilterService } from 'primereact/api'
import { Checkbox } from 'primereact/checkbox'
import { ColumnProps } from 'primereact/column'
import { useParams, useSearchParams } from 'react-router'

import { BrandsDataTableFilter } from '@/entities/brand'
import {
  BrandsTagsCellTemplate,
  LocationEntity,
  useCreateWorkshopConnectedLocationsMutation,
} from '@/entities/location'
import { IdParam } from '@/shared/lib'
import { DataTableCheckedDropdown } from '@/shared/ui'

// Custom filtering is enabled by defining a filter function using FilterService.register where the rule argument must be "custom_[field]" and the filter match mode of the field must be FilterMatchMode.CUSTOM. https://primereact.org/datatable/#custom_filter
FilterService.register('custom_brands', (brands: LocationEntity['brands'], filterValue: string[]) => {
  if (!filterValue || !brands) return true
  if (filterValue.length === 0) return true
  return brands.some(({ id }) => filterValue.includes(id))
})

type LocationWithConnectedEntity = LocationEntity & { connected: boolean }

export const useConnectedLocationsColumns = () => {
  const { id = '' } = useParams<IdParam>()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.connectedLocations.table.headers.${key}`)
  const [createConnectedLocations, { isError: isCreateWorkshopConnectedLocationsError }] =
    useCreateWorkshopConnectedLocationsMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  if (isCreateWorkshopConnectedLocationsError) {
    //TODO: Add proper error handling
    console.error('Error during mutating connected locations')
  }

  const handleCreateConnectedLocation = async (connectedLocationId: string) => {
    await createConnectedLocations({ connectedLocationId, locationId: id })
  }

  const handleOpenDialogToDeleteConnectedLocation = (connectedLocationId: string) => {
    searchParams.set('connectedLocationId', connectedLocationId)
    setSearchParams(new URLSearchParams(searchParams), { replace: true })
  }

  const checkboxTemplate = (entity: LocationWithConnectedEntity) => {
    return (
      <div className="flex justify-center">
        <Checkbox
          onChange={async ({ target }) => {
            if (target.checked) {
              await handleCreateConnectedLocation(entity.id)
              return
            }
            handleOpenDialogToDeleteConnectedLocation(entity.id)
          }}
          checked={entity.connected}
        />
      </div>
    )
  }

  const columns: ColumnProps[] = [
    {
      field: 'code',
      header: translate('locationId'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'name',
      header: translate('locationName'),
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
      header: translate('brands'),
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
      header: translate('zipCode'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.city',
      header: translate('city'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.address',
      header: translate('address'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: checkboxTemplate,
      field: 'connected',
      header: translate('connected'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.EQUALS,
      filterElement: (options) => (
        <DataTableCheckedDropdown value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
      ),
      showFilterMenu: false,
      showClearButton: false,
    },
  ]

  return columns
}
