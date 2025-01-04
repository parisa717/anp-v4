import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Link } from 'react-router'

import { useGetAdditionalBusinessStatusesByLocationQuery } from '@/entities/additionalBusinessStatus'
import { useGetBusinessStatusesByLocationQuery } from '@/entities/businessStatus'
import { useGetCurrentLocation } from '@/entities/location'
import { pageUrls } from '@/shared/lib'

import { BusinessStatusMode } from '../config/businessStatusModes'
import { useColumns } from '../lib/useColumns'

type StatusDataByLocationModeSectionProps = {
  isAdditionalBusinessStatus: boolean
}

//TODO: Add error handling for queries and mutations

export const StatusDataByLocationModeSection = ({
  isAdditionalBusinessStatus,
}: StatusDataByLocationModeSectionProps) => {
  const { t } = useTranslation()

  const locationId = useGetCurrentLocation()

  const {
    data: businessStatusesByLocation,
    isLoading: isBusinessStatusesByLocationLoading,
    isSuccess: isBusinessStatusesByLocationSuccess,
  } = useGetBusinessStatusesByLocationQuery(
    { id: locationId },
    {
      skip: isAdditionalBusinessStatus,
    },
  )

  const {
    data: additionalBusinessStatusesByLocation,
    isLoading: isAdditionalBusinessStatusesByLocationIsLoading,
    isSuccess: isAdditionalBusinessStatusesByLocationSuccess,
  } = useGetAdditionalBusinessStatusesByLocationQuery(
    { id: locationId },
    {
      skip: !isAdditionalBusinessStatus,
    },
  )

  const columns = useColumns({ isAdditionalBusinessStatus, mode: BusinessStatusMode.ByLocation })

  const data = (isAdditionalBusinessStatus ? additionalBusinessStatusesByLocation : businessStatusesByLocation) ?? []

  const translate = (key: string) => t(`pages.businessStatusByLocation.businessStatusByLocationList.${key}`)

  if (isBusinessStatusesByLocationLoading || isAdditionalBusinessStatusesByLocationIsLoading) {
    return 'Loading...'
  }

  if (isBusinessStatusesByLocationSuccess || isAdditionalBusinessStatusesByLocationSuccess) {
    return (
      <section className="flex flex-col gap-9 basis-1/2">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-3xl text-bluegray-700 m-0 font-normal">
            {translate(isAdditionalBusinessStatus ? 'additionalStatus' : 'appointmentStatus')}
          </h3>
          <Link
            to={
              isAdditionalBusinessStatus
                ? pageUrls.businessStatusByLocation.createAdditional()
                : pageUrls.businessStatusByLocation.create()
            }
          >
            <Button
              label={translate(isAdditionalBusinessStatus ? 'addNewAdditionalStatus' : 'addNewAppointmentStatus')}
              severity="secondary"
              outlined
            />
          </Link>
        </div>

        <DataTable
          removableSort
          columns={columns}
          data={data}
          emptyMessage={translate('table.empty')}
          rowClassName={(rowData) => (rowData.isActive ? undefined : 'bg-table-body-row-even')}
        />
      </section>
    )
  }

  return null
}
