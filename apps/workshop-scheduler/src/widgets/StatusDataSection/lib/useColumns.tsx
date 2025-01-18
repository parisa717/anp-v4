import { useTranslation } from '@nexus-ui/i18n'
import { EntityStatusDropdown } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { ColumnProps } from 'primereact/column'
import { createSearchParams, Link, useNavigate } from 'react-router'

import {
  AdditionalBusinessStatusEntity,
  useUnassignAdditionalBusinessStatusFromLocationMutation,
} from '@/entities/additionalBusinessStatus'
import {
  BusinessStatusEntity,
  ChangeBusinessStatusSearchParams,
  useUnassignBusinessStatusFromLocationMutation,
} from '@/entities/businessStatus'
import { useGetCurrentLocation } from '@/entities/location'
import { pageUrls } from '@/shared/lib'
import { DeleteEntityButton } from '@/shared/ui'

import { BusinessStatusMode } from '../config/businessStatusModes'

type BusinessStatusCommonProperties = Pick<
  BusinessStatusEntity | AdditionalBusinessStatusEntity,
  keyof BusinessStatusEntity & keyof AdditionalBusinessStatusEntity
>

type useColumnsArgs = {
  isAdditionalBusinessStatus: boolean
  mode: BusinessStatusMode
}

export const useColumns = ({ isAdditionalBusinessStatus, mode }: useColumnsArgs) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const locationId = useGetCurrentLocation()
  const [
    unassignBusinessStatusFromLocationMutation,
    { isLoading: isLoadingUnassignBusinessStatusFromLocationMutation },
  ] = useUnassignBusinessStatusFromLocationMutation()

  const isSortable = mode === BusinessStatusMode.ByLocation

  const translate = (key: string) =>
    mode === BusinessStatusMode.Default
      ? t(`pages.businessStatus.businessStatusList.table.${key}`)
      : t(`pages.businessStatusByLocation.businessStatusByLocationList.table.${key}`)
  const [
    unassignAdditionalBusinessStatusFromLocationMutation,
    { isLoading: isLoadingUnassignAdditionalBusinessStatusFromLocationMutation },
  ] = useUnassignAdditionalBusinessStatusFromLocationMutation()

  const isActiveTemplate = (cellData: BusinessStatusCommonProperties) => {
    return (
      <EntityStatusDropdown
        value={cellData.isActive}
        onChange={(e) => {
          if (cellData.isDefault && !e.value) {
            navigate(
              isAdditionalBusinessStatus
                ? pageUrls.businessStatus.unselectDefaultAdditional(cellData.id)
                : pageUrls.businessStatus.unselectDefault(cellData.id),
            )
            return
          }

          const searchParams: ChangeBusinessStatusSearchParams = {
            type: e.value ? 'activate' : 'deactivate',
            isAdditionalBusinessStatus: isAdditionalBusinessStatus ? 'true' : 'false',
          }

          navigate({
            pathname: pageUrls.businessStatus.changeStatusConfirmation(cellData.id),
            search: createSearchParams(searchParams).toString(),
          })
        }}
      />
    )
  }

  const isDefaultTemplate = (cellData: BusinessStatusCommonProperties) => {
    return cellData.isDefault ? <i className="pi pi-check text-theme-primary size-6" /> : null
  }

  const isHighlightedTemplate = (cellData: AdditionalBusinessStatusEntity) => {
    return cellData.isHighlighted ? <i className="pi pi-check text-theme-primary size-6" /> : null
  }

  const linkTemplate = (cellData: BusinessStatusCommonProperties) => {
    const renderDeleteButtonOrNull = () => {
      if (cellData.isDefault) {
        return null
      }

      if (isAdditionalBusinessStatus) {
        return (
          <DeleteEntityButton
            onDelete={() =>
              unassignAdditionalBusinessStatusFromLocationMutation({
                additionalBusinessStatusId: cellData.id,
                locationId,
              })
            }
            isLoading={isLoadingUnassignAdditionalBusinessStatusFromLocationMutation}
          />
        )
      }

      return (
        <DeleteEntityButton
          onDelete={() => unassignBusinessStatusFromLocationMutation({ businessStatusId: cellData.id, locationId })}
          isLoading={isLoadingUnassignBusinessStatusFromLocationMutation}
        />
      )
    }

    return mode === BusinessStatusMode.Default ? (
      <Link
        to={
          isAdditionalBusinessStatus
            ? pageUrls.businessStatus.editAdditional(cellData.id)
            : pageUrls.businessStatus.edit(cellData.id)
        }
      >
        <Button
          link
          label={t('edit')}
          className="capitalize text-theme-primary"
          icon="pi pi-pencil"
          text
          iconPos="right"
        />
      </Link>
    ) : (
      <>{renderDeleteButtonOrNull()}</>
    )
  }

  const columns: ColumnProps[] = [
    {
      rowReorder: true,
      hidden: mode === BusinessStatusMode.ByLocation || isAdditionalBusinessStatus,
    },
    {
      field: 'name',
      header: translate('columnHeaders.name'),
      sortable: isSortable,
      pt: {
        headerCell: {
          className: 'min-w-48',
        },
      },
    },
    {
      field: 'isDefault',
      header: translate('columnHeaders.isDefault'),
      sortable: isSortable,
      body: isDefaultTemplate,
      pt: {
        bodyCell: {
          className: 'text-center',
        },
      },
    },
    {
      field: 'isHighlighted',
      header: translate('columnHeaders.isHighlighted'),
      sortable: isSortable,
      body: isHighlightedTemplate,
      hidden: !isAdditionalBusinessStatus,
      pt: {
        bodyCell: {
          className: 'text-center',
        },
      },
    },
    {
      field: 'isActive',
      header: translate('columnHeaders.isActive'),
      sortable: isSortable,
      body: isActiveTemplate,
      hidden: mode === BusinessStatusMode.ByLocation,
      pt: {
        headerTitle: {
          className: 'text-center w-full',
        },
        headerCell: {
          className: 'min-w-32',
        },
      },
    },
    {
      field: 'details',
      body: linkTemplate,
      pt: {
        bodyCell: {
          className: 'text-end w-full',
        },
      },
    },
  ]

  return columns
}
