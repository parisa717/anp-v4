import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Outlet, useParams } from 'react-router'

import { useGetAreaQuery } from '@/entities/area'
import { useGetLocationQuery } from '@/entities/location'
import { IdParam } from '@/shared/lib'

import { useAreaColumns } from '../lib/useAreaColumns'
import { useGetBreadcrumbItems } from '../lib/useGetBreadcrumbItems'
import { useLocationColumns } from '../lib/useLocationColumns'
import { LocationDetailsTabs } from './locationDetailsTabs/LocationDetailsTabs'

const dataTablePt = {
  root: {
    className: 'border border-bluegray-200 border-solid rounded bg-shade-000 p-3 mb-2',
  },
  table: {
    className: 'table-fixed',
  },
  column: {
    root: {
      className: 'bg-shade-000 border-0',
    },
    bodyCell: {
      className: 'text-text-base-text-xl-semibold-lineheight-150 text-bluegray-700 border-0 p-1',
    },
    headerCell: {
      className: 'p-1 pb-0',
    },
    headerTitle: {
      className: 'text-text-base-regular-lineheight-150 text-bluegray-500 border-0',
    },
  },
}

const LocationDetailsPage = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.${key}`)
  const breadcrumbItems = useGetBreadcrumbItems()
  const areaColumns = useAreaColumns()
  const locationColumns = useLocationColumns()

  const { id = '' } = useParams<IdParam>()
  const { data: locationData, isLoading: isLocationDataLoading, isError: isErrorLocation } = useGetLocationQuery({ id })
  const {
    data: areaData,
    isLoading: isAreaDataLoading,
    isError: isErrorArea,
  } = useGetAreaQuery({ id: locationData?.area?.id ?? '' }, { skip: !locationData?.area?.id })

  if (isErrorLocation || isErrorArea) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return (
    <main>
      <BreadCrumb
        model={breadcrumbItems}
        pt={{
          root: {
            className: 'border-none bg-[transparent]',
          },
        }}
      />
      <h1 className="text-headline">{translate('title')}</h1>
      <DataTable
        columns={areaColumns}
        data={areaData ? [areaData] : []}
        loading={isAreaDataLoading}
        pt={{ ...dataTablePt, root: { ...dataTablePt.root, 'data-cy': 'area-table' } }}
        emptyMessage={translate('areaTable.empty')}
      />
      <DataTable
        columns={locationColumns}
        data={locationData ? [locationData] : []}
        loading={isLocationDataLoading}
        pt={{ ...dataTablePt, root: { ...dataTablePt.root, 'data-cy': 'location-table' } }}
        emptyMessage={translate('locationTable.empty')}
      />
      <LocationDetailsTabs />
      <Outlet />
    </main>
  )
}

export default LocationDetailsPage
