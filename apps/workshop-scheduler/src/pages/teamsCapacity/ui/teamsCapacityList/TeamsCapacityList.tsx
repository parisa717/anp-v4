import { useTranslation } from '@nexus-ui/i18n'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Fragment, useRef } from 'react'

import { LocationTeamsCalendarDayCapacity } from '@/entities/teamsCapacity'

import { TeamsCapacityOverlayPanel } from '../teamsCapacityOverlayPanel'

interface TeamsCapacityListProps {
  capacities: LocationTeamsCalendarDayCapacity[]
  startDate: Date
}

export const TeamsCapacityList = ({ startDate, capacities }: TeamsCapacityListProps) => {
  const { t } = useTranslation()

  const overlayPanelRef = useRef<OverlayPanel>(null)

  return (
    <div className="flex flex-col gap-1 capacities-wrapper">
      {capacities.map(({ teamId, qualificationName, capacity }) => (
        <Fragment key={`${teamId}-${qualificationName}-${capacity}`}>
          <div
            data-cy="team-capacity-list-item"
            className="flex text-sm gap-2 w-min"
            onDoubleClick={(e) => {
              overlayPanelRef.current?.toggle(e)
            }}
          >
            <p className="w-12 shrink-0 m-0">
              {capacity} {t(`pages.teamsCapacity.calendar.workUnit`)}
            </p>
            <p className="font-semibold text-wrap m-0">{qualificationName}</p>
          </div>
          <TeamsCapacityOverlayPanel ref={overlayPanelRef} startDate={startDate} id={teamId} />
        </Fragment>
      ))}
    </div>
  )
}
