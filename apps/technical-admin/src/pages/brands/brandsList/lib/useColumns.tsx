import { useTranslation } from '@nexus-ui/i18n'
import { FilterMatchMode } from 'primereact/api'
import { ColumnProps } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

import { BrandEntity } from '@/entities/brand'
import { pageUrls } from '@/shared/lib'
import { DetailsButtonCell, StatusCell } from '@/shared/ui'

export const useColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.brands.brandsList.${key}`)

  const columns: ColumnProps[] = [
    {
      field: 'name',
      header: translate('table.columnHeaders.name'),
      className: 'w-8/12 uppercase',
      sortable: true,
      filter: true,
      filterField: 'name',
      showFilterMenu: false,
      filterMatchMode: FilterMatchMode.CONTAINS,
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
      header: translate('table.columnHeaders.status'),
      body: (brand: BrandEntity) => <StatusCell data={brand} />,
      sortable: true,
      filter: true,
      filterField: 'isActive',
      showFilterMenu: false,
      filterMatchMode: FilterMatchMode.EQUALS,
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
              label: translate('table.statuses.active'),
              value: true,
            },
            {
              label: translate('table.statuses.inactive'),
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
      body: (brand: BrandEntity) => <DetailsButtonCell data={brand} pageUrl={pageUrls.brands.edit} />,
    },
  ]

  return columns
}
