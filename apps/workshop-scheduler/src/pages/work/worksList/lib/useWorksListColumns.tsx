import { useTranslation } from '@nexus-ui/i18n'
import { DataTableSearchInput } from '@nexus-ui/ui'
import clsx from 'clsx'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { Link, useNavigate } from 'react-router'

import { BrandsDataTableFilter } from '@/entities/brand'
import { QualificationsDataTableFilter } from '@/entities/qualification'
import { WorkEntity } from '@/entities/work'
import { pageUrls } from '@/shared/lib'
import { DataTableCheckedDropdown, EntityStatusDropdown } from '@/shared/ui'

export const useWorksListColumns = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const translate = (key: string) => t(`pages.work.worksList.table.${key}`)

  const workBrandNamesTemplate = (cellData: WorkEntity) => {
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

  const workBrandTimeUnitsTemplate = (cellData: WorkEntity) => {
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

  const isDescriptionEditableTemplate = (entity: WorkEntity) => {
    return entity.isDescriptionEditable ? (
      <i className="pi pi-check text-theme-primary size-6" />
    ) : (
      <i className="pi pi-times text-surface-900 size-6" />
    )
  }

  const isCapacityEditableTemplate = (entity: WorkEntity) => {
    return entity.isCapacityEditable ? (
      <i className="pi pi-check text-theme-primary size-6" />
    ) : (
      <i className="pi pi-times text-surface-900 size-6" />
    )
  }

  const isActiveStatusBodyTemplate = (cellData: WorkEntity) => {
    const onChange = () =>
      navigate(
        cellData.isActive ? pageUrls.work.deactivateService(cellData.id) : pageUrls.work.activateService(cellData.id),
      )

    return <EntityStatusDropdown value={cellData.isActive} onChange={onChange} />
  }

  const linkTemplate = (cellData: WorkEntity) => {
    return (
      <Link to={pageUrls.work.edit(cellData.id)}>
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
      field: 'name',
      header: translate('columnHeaders.workName'),
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
      header: translate('columnHeaders.workBrandNames'),
      body: workBrandNamesTemplate,
      sortable: false,
      filter: true,
      filterElement: BrandsDataTableFilter(),
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
      header: translate('columnHeaders.workBrandTimeUnits'),
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
      header: translate('columnHeaders.productiveTeam'),
      body: (cellData: WorkEntity) => cellData.qualification.name,
      sortable: true,
      filter: true,
      filterElement: QualificationsDataTableFilter(),
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
      header: translate('columnHeaders.isDescriptionEditable'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.EQUALS,
      filterElement: (options) => (
        <DataTableCheckedDropdown value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
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
      header: translate('columnHeaders.isCapacityEditable'),
      sortable: true,
      filter: true,
      filterMatchMode: FilterMatchMode.EQUALS,
      filterElement: (options) => (
        <DataTableCheckedDropdown value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
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
      field: 'isActive',
      header: translate('columnHeaders.isActive'),
      sortable: true,
      body: isActiveStatusBodyTemplate,
      pt: {
        headerTitle: {
          className: 'text-center w-full',
        },
        headerCell: {
          className: 'min-w-32',
        },
        bodyCell: {
          className: 'align-top',
        },
      },
    },
    {
      body: linkTemplate,
      pt: {
        headerCell: {
          className: 'min-w-64',
        },
        bodyCell: {
          className: 'text-end align-top min-w-64',
        },
      },
    },
  ]

  return columns
}
