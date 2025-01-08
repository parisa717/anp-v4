import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Outlet, useNavigate } from 'react-router'

import { LocationEntity, useGetLocationsQuery } from '@/entities/location'
import { pageUrls } from '@/shared/lib'

import { useColumns } from '../lib/useColumns'

const LocationsListPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.locations.locationsList.${key}`)

  const { data: locations, isLoading, isError } = useGetLocationsQuery()
  const columns = useColumns()

  if (isError) {
    // TODO: Add proper error handling
    return 'Error'
  }

  const handleAddLocationClick = () => {
    navigate(pageUrls.locations.create())
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[35px] leading-none">{translate('title')}</h1>
        <Button severity="secondary" outlined label={translate('addLocationButton')} onClick={handleAddLocationClick} />
      </div>

      <DataTable<LocationEntity[]>
        removableSort
        columns={columns}
        data={locations || []}
        loading={isLoading}
        emptyMessage={translate('table.empty')}
        filterDisplay="row"
      />

      <Outlet />
    </main>
  )
}

export default LocationsListPage
