import { DataTable } from '@nexus-ui/ui'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useTranslation } from 'react-i18next'

import { useGetLocationsQuery } from '@/entities/location'

import { useColumns } from '../lib/useColumns'
import { SelectedLocationEntity, WorkEntry } from '../model/types'

interface LocationTableProps {
  work: WorkEntry
  onChange: (updatedLocations: SelectedLocationEntity[]) => void
  selectedLocations: SelectedLocationEntity[]
}

export const LocationTable = ({ work, onChange, selectedLocations }: LocationTableProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.assignLocations.${key}`)

  const {
    data: locations,
    isLoading: isLoadingLocations,
    isError: isLocationsError,
  } = useGetLocationsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data
        ?.filter((location) =>
          location.brands.some((locationBrand) => work.brands?.some((workBrand) => workBrand.id === locationBrand.id)),
        ) //TODO: update this query when getLocations operation is synced with GW
        .map((location) => ({
          ...location,
          brands: location.brands.filter((locationBrand) =>
            work.brands?.some((workBrand) => workBrand.id === locationBrand.id),
          ),
          isSelected: false,
          isRecommended: false,
          brandIds: [],
        })),
    }),
  })

  const filteredBrands = locations
    ?.flatMap((location) => location.brands)
    .filter(
      (brand, index, self) =>
        work.brands?.some((workBrand) => workBrand.id === brand.id) &&
        self.findIndex((b) => b.id === brand.id) === index,
    )

  const columns = useColumns(filteredBrands ?? [], selectedLocations, onChange, locations ?? [])

  if (isLocationsError) {
    //TODO: Add proper error handling
    return 'Error'
  }

  return isLoadingLocations ? (
    <ProgressSpinner
      className="w-full overflow-hidden h-14"
      pt={{
        spinner: {
          className: 'size-14',
        },
      }}
    />
  ) : (
    <DataTable
      columns={columns}
      data={locations ?? []}
      loading={isLoadingLocations}
      filterDisplay="row"
      emptyMessage={translate('table.empty')}
      removableSort
    />
  )
}
