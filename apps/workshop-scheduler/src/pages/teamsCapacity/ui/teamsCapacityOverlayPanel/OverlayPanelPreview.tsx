import { useTranslation } from '@nexus-ui/i18n'
import { format, getDay } from 'date-fns'
import { Button } from 'primereact/button'

import { mapDayNumberToDayName } from '@/entities/locationCounterCalendar'
import { useGetTeamCapacityQuery } from '@/entities/teamsCapacity'
import { ROUTE_PATHS } from '@/shared/lib'
import { ServerSideErrorsMessagesList } from '@/shared/ui'

interface OverlayPanelPreviewProps {
  onEdit: () => void
  onClose: () => void
  id: string
  startDate: Date
}

export const OverlayPanelPreview = ({ onEdit, id, startDate, onClose }: OverlayPanelPreviewProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.teamsCapacity.${key}`)

  const { data: teamCapacityQueryData, isLoading: isTeamCapacityQueryDataLoading } = useGetTeamCapacityQuery({
    id,
    startDate: format(new Date(startDate), 'yyyy-MM-dd'),
  })

  if (isTeamCapacityQueryDataLoading) return <div>Loading...</div>

  const teamCapacityDate = teamCapacityQueryData?.date
    ? `${mapDayNumberToDayName(t)[getDay(new Date(teamCapacityQueryData?.date))]} ${format(new Date(teamCapacityQueryData?.date), 'dd.MM.yyyy')}`
    : '-'

  return (
    <div className="p-4 flex gap-10 flex-col min-w-80 text-bluegray-700">
      <ServerSideErrorsMessagesList page={ROUTE_PATHS.TeamsCapacity.Root} className="mb-8" />
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-bold m-0">{translate('calendar.event.overlayPanel.title')}</p>
        <i data-cy="close-icon" className="pi pi-times cursor-pointer text-base text-bluegray-700" onClick={onClose} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="m-0 text-bluegray-500 capitalize">{t('team')}</p>
          <p className="m-0 font-bold text-xl">{teamCapacityQueryData?.qualificationName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="m-0 text-bluegray-500 capitalize">{t('calendar.day')}</p>
          <p className="m-0 font-bold text-xl">{teamCapacityDate}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="m-0 text-bluegray-500 capitalize">{`${translate('capacity')} (${translate('calendar.workUnit')})`}</p>
            <p className="m-0 font-bold text-xl">{teamCapacityQueryData?.capacity}</p>
          </div>
          <Button onClick={onEdit} severity="secondary" label={t('edit')} className="capitalize" outlined />
        </div>
      </div>
    </div>
  )
}
