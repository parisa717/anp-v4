import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { useParams, useSearchParams } from 'react-router'

import { useGetLocationsQuery, useGetWorkshopConnectedLocationsQuery } from '@/entities/location'
import { IdParam } from '@/shared/lib'

import { useConnectedLocationsColumns } from '../../lib/useConnectedLocationsColumns'
import { CancelConnectionDialog } from './CancelConnectionDialog'

export const ConnectedLocationsTab = () => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.location.locationDetails.connectedLocations.${key}`)
  const locationColumns = useConnectedLocationsColumns()

  const [searchParams] = useSearchParams()
  const connectedLocationId = searchParams.get('connectedLocationId')

  const { id = '' } = useParams<IdParam>()
  const { data: locations, isLoading: isLoadingLocations, isError: isLocationsError } = useGetLocationsQuery()
  const {
    data: connectedLocations,
    isLoading: isLoadingConnectedLocations,
    isError: isConnectedLocationsError,
  } = useGetWorkshopConnectedLocationsQuery(
    {
      locationId: id,
    },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.map((connectedLocation) => connectedLocation.connectedLocationId) || [],
      }),
    },
  )

  if (isLocationsError || isConnectedLocationsError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  const locationsWithConnectedFlag = locations?.map((location) => ({
    ...location,
    connected: connectedLocations.includes(location.id),
  }))

  return (
    <main>
      <h2 className="text-3xl-regular-lineheight-150 text-bluegray-700">{translate('title')}</h2>
      <p className="text-base-regular-lineheight-150 text-bluegray-700 mb-8">{translate('description')}</p>
      <DataTable
        columns={locationColumns}
        data={locationsWithConnectedFlag ?? []}
        loading={isLoadingLocations || isLoadingConnectedLocations}
        filterDisplay="row"
        emptyMessage={translate('table.empty')}
      />
      {connectedLocationId && <CancelConnectionDialog connectedLocationId={connectedLocationId} />}
    </main>
  )
}
