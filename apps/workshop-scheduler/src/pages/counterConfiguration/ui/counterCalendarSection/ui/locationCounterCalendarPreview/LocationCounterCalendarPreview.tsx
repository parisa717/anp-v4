import { useTranslation } from '@nexus-ui/i18n'
import { DataTable } from '@nexus-ui/ui'
import { Button } from 'primereact/button'

import { LocationCounterCalendarWorkDayEntity } from '@/entities/locationCounterCalendar'

import { useColumns } from '../../../../lib/useColumns'

interface LocationCounterCalendarPreviewProps {
  isWorkDaysDataLoading: boolean
  workDaysData: LocationCounterCalendarWorkDayEntity[]
  onEdit: () => void
}

export const LocationCounterCalendarPreview = ({
  isWorkDaysDataLoading,
  workDaysData,
  onEdit,
}: LocationCounterCalendarPreviewProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.counterConfiguration.sections.counterCalendar.${key}`)

  const columns = useColumns()

  return (
    <>
      <DataTable
        removableSort
        columns={columns}
        data={workDaysData}
        loading={isWorkDaysDataLoading}
        emptyMessage={translate('table.empty')}
      />
      <div className="flex bg-shade-000 p-4 justify-end">
        <Button
          link
          disabled={isWorkDaysDataLoading}
          label={t('edit')}
          className="capitalize text-theme-primary"
          icon="pi pi-pencil"
          text
          iconPos="right"
          onClick={onEdit}
        />
      </div>
    </>
  )
}
