import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { Link } from 'react-router'

import { FollowUpWorkEntity } from '@/entities/followUpWork'
import { pageUrls } from '@/shared/lib'
import { EntityStatusDropdown } from '@/shared/ui'

export const useFollowUpWorksListColumns = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.work.followUpWorksList.table.${key}`)

  const isDescriptionEditableTemplate = (entity: FollowUpWorkEntity) => {
    return entity.isDescriptionEditable ? (
      <i className="pi pi-check text-theme-primary size-6" />
    ) : (
      <i className="pi pi-times text-surface-900 size-6" />
    )
  }

  const isCapacityEditableTemplate = (entity: FollowUpWorkEntity) => {
    return entity.isCapacityEditable ? (
      <i className="pi pi-check text-theme-primary size-6" />
    ) : (
      <i className="pi pi-times text-surface-900 size-6" />
    )
  }

  const isActiveTemplate = (cellData: FollowUpWorkEntity) => {
    return <EntityStatusDropdown value={cellData.isActive} onChange={() => {}} />
  }

  const linkTemplate = (cellData: FollowUpWorkEntity) => {
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
      header: translate('columnHeaders.followUpWorkName'),
      sortable: false,
      filter: false,
    },
    {
      field: 'timeUnits',
      header: translate('columnHeaders.followUpWorkBrandTimeUnits'),
      sortable: false,
      filter: false,
    },
    {
      field: 'qualification.name',
      header: translate('columnHeaders.productiveTeam'),
      sortable: false,
      filter: false,
    },
    {
      field: 'isDescriptionEditable',
      body: isDescriptionEditableTemplate,
      header: translate('columnHeaders.isDescriptionEditable'),
      sortable: false,
      filter: false,
    },
    {
      field: 'isCapacityEditable',
      body: isCapacityEditableTemplate,
      header: translate('columnHeaders.isCapacityEditable'),
      sortable: false,
      filter: false,
    },
    {
      field: 'isActive',
      header: translate('columnHeaders.isActive'),
      sortable: false,
      body: isActiveTemplate,
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
