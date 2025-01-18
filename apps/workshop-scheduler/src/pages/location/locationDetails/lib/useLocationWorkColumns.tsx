import { useTranslation } from '@nexus-ui/i18n'
import { DataTableCheckedDropdown, DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode, FilterService } from 'primereact/api'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { ColumnProps } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Link } from 'react-router'

import { BrandsDataTableFilter } from '@/entities/brand'
import { ListLocationWorkItemEntity, useUpdateLocationWorkMutation } from '@/entities/locationWork'
import { pageUrls } from '@/shared/lib'

const brandBodyTemplate = (entity: ListLocationWorkItemEntity) => (
  <div className="flex items-center gap-2">
    {entity.brands.map((brand) => (
      <Tag key={brand.id} value={brand.code} severity="info" className="uppercase bg-tag text-tag" />
    ))}
  </div>
)

const timeunitsBodyTemplate = (entity: ListLocationWorkItemEntity) =>
  entity.brands.reduce((accumulator, currentValue) => accumulator + (currentValue?.timeUnits ?? 0), 0)

FilterService.register('custom_brands', (brands: ListLocationWorkItemEntity['brands'], filterValue: string[]) => {
  if (!filterValue || !brands) return true
  if (filterValue.length === 0) return true

  return brands.some((brand) => brand && filterValue.includes(brand.id))
})

export const useLocationWorkColumns = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.table.headers.${key}`)

  const [updateLocationWork, { isLoading: isUpdateLocationWorkPending }] = useUpdateLocationWorkMutation()

  const actionBodyTemplate = (cellData: ListLocationWorkItemEntity) => (
    <Link to={pageUrls.location.details.locationWorks.edit(cellData.locationId, cellData.id)}>
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

  const isRecommendedBodyTemplate = (entity: ListLocationWorkItemEntity) => {
    const updatedLocationWork = {
      id: entity.id,
      locationId: entity.locationId,
      workId: entity.workId,
      isRecommended: !entity.isRecommended,
      amountPerDayLimit: entity.amountPerDayLimit || 0,
      capacityPerDayLimit: entity.capacityPerDayLimit || 0,
      brands: entity.brands.map((brand) => ({ id: brand.id })),
    }

    return (
      <div className="flex justify-center">
        <Checkbox
          disabled={isUpdateLocationWorkPending}
          onChange={async () => {
            await updateLocationWork({ workshopLocationWork: updatedLocationWork })
          }}
          checked={entity.isRecommended}
        />
      </div>
    )
  }

  const columns: ColumnProps[] = [
    {
      field: 'name',
      header: translate('name'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: brandBodyTemplate,
      field: 'brands',
      header: translate('brands'),
      sortable: false,
      filter: true,
      filterMatchMode: FilterMatchMode.CUSTOM,
      filterElement: BrandsDataTableFilter(),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: timeunitsBodyTemplate,
      field: 'timeunits',
      header: translate('timeunits'),
      sortable: false,
      filter: false,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'qualification.name',
      header: translate('qualification'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: isRecommendedBodyTemplate,
      field: 'isRecommended',
      header: translate('isRecommended'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.EQUALS,
      filterElement: (options) => (
        <DataTableCheckedDropdown value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
      ),
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'amountPerDayLimit',
      header: translate('dayLimits'),
      sortable: false,
      filter: false,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      body: actionBodyTemplate,
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
