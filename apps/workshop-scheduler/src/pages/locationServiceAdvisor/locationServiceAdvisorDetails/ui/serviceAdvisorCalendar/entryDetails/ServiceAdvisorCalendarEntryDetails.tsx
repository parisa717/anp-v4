import './ServiceAdvisorCalendarEntryDetails.css'

import clsx from 'clsx'
import { OverlayPanel } from 'primereact/overlaypanel'
import { forwardRef } from 'react'
import { Event } from 'react-big-calendar'

import { CalendarEntryTypeEnum } from '@/shared/api/types.generated'

import { CalendarEntryBufferAppointment } from './bufferAppointment/CalendarEntryBufferAppointment'

type Props = {
  entry: Event
  onClose: VoidFunction
  isInsideShowMorePopup: boolean
}

export const ServiceAdvisorCalendarEntryDetails = forwardRef<OverlayPanel, Props>(
  function ServiceAdvisorCalendarEntryDetails({ entry, onClose, isInsideShowMorePopup }, forwardedRef) {
    if (entry.resource?.eventType !== CalendarEntryTypeEnum.AdvisorBuffer) return null // TODO: will be added in next tasks

    let entryDetails = null
    if (entry.resource?.eventType === CalendarEntryTypeEnum.AdvisorBuffer) {
      entryDetails = <CalendarEntryBufferAppointment entry={entry} onClose={onClose} />
    }

    return (
      <OverlayPanel
        ref={forwardedRef}
        pt={{ content: { className: 'p-0' } }}
        className={clsx({
          ['!top-10 !left-10']: isInsideShowMorePopup,
        })}
        appendTo={isInsideShowMorePopup ? document.querySelector<HTMLElement>('.rbc-overlay') : document.body}
      >
        {entryDetails}
      </OverlayPanel>
    )
  },
)
