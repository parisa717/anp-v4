import { useTranslation } from '@nexus-ui/i18n'
import { DataTableDropdown, DataTableSearchInput } from '@nexus-ui/ui'
import { FilterMatchMode } from 'primereact/api'
import { ColumnProps } from 'primereact/column'

import { AreaEntity } from '@/entities/area'
import { pageUrls } from '@/shared/lib'
import { DetailsButtonCell, StatusCell } from '@/shared/ui'

export const useColumns = () => {
  const { t } = useTranslation()

  const columns: ColumnProps[] = [
    {
      field: 'id',
      header: t('pages.areas.areasList.table.columnHeaders.id'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
      pt: {
        headerCell: {
          className: 'text-center w-[140px]',
        },
        bodyCell: {
          className: 'text-center',
        },
      },
    },
    {
      field: 'name',
      header: t('pages.areas.areasList.table.columnHeaders.name'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.country.name',
      header: t('pages.areas.areasList.table.columnHeaders.country'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.postCode',
      header: t('pages.areas.areasList.table.columnHeaders.postCode'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.city',
      header: t('pages.areas.areasList.table.columnHeaders.city'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
      showFilterMenu: false,
      showClearButton: false,
    },
    {
      field: 'address.address',
      header: t('pages.areas.areasList.table.columnHeaders.address'),
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
      header: t('pages.areas.areasList.table.columnHeaders.status'),
      body: (area: AreaEntity) => <StatusCell data={area} />,
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
      field: 'details',
      body: (area: AreaEntity) => <DetailsButtonCell data={area} pageUrl={pageUrls.areas.detail} />,
      pt: {
        bodyCell: {
          className: 'px-1 py-0',
        },
      },
    },
  ].map((col) => ({
    pt: {
      headerCell: {
        className: 'px-1 py-4',
      },
      bodyCell: {
        className: 'px-1 py-4',
      },
    },
    ...col,
  }))

  return columns
}
