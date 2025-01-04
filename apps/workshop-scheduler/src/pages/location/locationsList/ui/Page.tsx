import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Message } from 'primereact/message'
import { Outlet } from 'react-router'

import { useGetLocationsQuery } from '@/entities/location'
import { ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

import { useColumns } from '../lib/useColumns'

const LocationsListPage = () => {
  const { t } = useTranslation()
  const { data: locations, isLoading } = useGetLocationsQuery()
  const columns = useColumns()

  const translate = (key: string) => t(`pages.location.locationsList.${key}`)

  return (
    <main>
      <h1 className="text-headline">{translate('title')}</h1>
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.Location.Root} className="mb-8" />
      <Message severity="info" text={translate('message')} className="mb-7 w-full justify-start" />

      <DataTable
        removableSort
        columns={columns}
        data={locations ?? []}
        loading={isLoading}
        emptyMessage={translate('table.empty')}
        filterDisplay="row"
      />

      <Outlet />
    </main>
  )
}

export default LocationsListPage
