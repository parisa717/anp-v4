import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Link, useParams } from 'react-router'

import { useGetLocationWorksQuery } from '@/entities/locationWork'
import { IdParam, pageUrls } from '@/shared/lib'

import { useLocationWorkColumns } from '../../lib/useLocationWorkColumns'

export const LocationWorksTab = () => {
  const { t } = useTranslation()
  const { id: locationId = '' } = useParams<IdParam>()
  const locationWorkColumns = useLocationWorkColumns()
  const {
    data: locationWorksQueryData,
    isLoading: isLocationWorksQueryDataLoading,
    isError: hasLocationWorksDataQueryError,
  } = useGetLocationWorksQuery({ locationId })

  const translate = (key: string) => t(`pages.location.locationDetails.locationWorks.${key}`)

  //TODO: Add error/loading handling
  if (isLocationWorksQueryDataLoading) return <div>Loading</div>
  if (hasLocationWorksDataQueryError) return <div>Error occured!</div>

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 data-cy="overbooking-setup-title" className="text-3xl-regular-lineheight-150 text-bluegray-700">
          {translate('header')}
        </h2>
        <Link to={pageUrls.location.details.locationWorks.create(locationId)}>
          <Button label={translate('buttons.addLocationWork')} severity="secondary" outlined />
        </Link>
      </div>
      <DataTable
        columns={locationWorkColumns}
        data={locationWorksQueryData ?? []}
        loading={isLocationWorksQueryDataLoading}
        removableSort
        filterDisplay="row"
        emptyMessage={translate('table.empty')}
      />
    </section>
  )
}
