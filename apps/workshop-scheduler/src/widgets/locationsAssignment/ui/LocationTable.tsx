import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useState } from 'react'

import { useColumns } from '../lib/useColumns'
import { LocationEntity, SelectedLocationEntity, WorkEntry } from '../model/types'

interface LocationTableProps {
  isLoadingLocations: boolean
  locations: LocationEntity[]
  work: WorkEntry
  onChange: (updatedLocations: SelectedLocationEntity[]) => void
  selectedLocations: SelectedLocationEntity[]
}

export const LocationTable = ({
  isLoadingLocations,
  locations,
  work,
  onChange,
  selectedLocations,
}: LocationTableProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.assignLocations.${key}`)
  const [filteredLocations, setFilteredLocations] = useState<LocationEntity[]>([])

  const filteredBrands = locations
    ?.flatMap((location) => location.brands)
    .filter(
      (brand, index, self) =>
        work.brands?.some((workBrand) => workBrand.id === brand.id) &&
        self.findIndex((b) => b.id === brand.id) === index,
    )

  const columns = useColumns(filteredBrands ?? [], selectedLocations, onChange, filteredLocations)

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
      scrollable
      scrollHeight="calc(100vh - 279px)"
      columns={columns}
      data={locations}
      loading={isLoadingLocations}
      filterDisplay="row"
      emptyMessage={translate('table.empty')}
      removableSort
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      totalRecords={filteredLocations.length ?? 0}
      onValueChange={(value) => {
        setFilteredLocations(value)
      }}
    />
  )
}
