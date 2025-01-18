import { OverlayPanel } from 'primereact/overlaypanel'
import { ReactNode, SyntheticEvent, useRef, useState } from 'react'
import { EventWrapperProps, View } from 'react-big-calendar'
import { flushSync } from 'react-dom'

import { ServiceAdvisorCalendarEntryDetails } from '../../../entryDetails/ServiceAdvisorCalendarEntryDetails'

type Props = EventWrapperProps & {
  view: View
}

export const EventWrapper = ({ event, view, style }: Props) => {
  const overlayRef = useRef<OverlayPanel>(null)

  const [isInsideShowMorePopup, setIsInsideShowMorePopup] = useState(false)
  const handleShowDetails = (e: SyntheticEvent) => {
    const elementExists = !!document.querySelector<HTMLElement>('.rbc-overlay')
    if (elementExists) {
      //to be sure state is updated sync so there is no content shift
      flushSync(() => {
        setIsInsideShowMorePopup(true)
      })
    }
    overlayRef.current?.show(e, e.target)
  }
  const handleCloseDetails = () => {
    overlayRef.current?.hide()
    setIsInsideShowMorePopup(false)
  }

  let eventComponent: ReactNode = null
  if (event.allDay) {
    eventComponent = (
      <button className="service-advisor-calendar-event-button mb-1" onDoubleClick={handleShowDetails}>
        <div className="bg-fullcalendar-event p-1">
          <span className="text-shade-000 text-sm">{event.resource?.eventTypeName}</span>
        </div>
      </button>
    )
  } else if (view === 'month') {
    eventComponent = (
      <button className="service-advisor-calendar-event-button" onDoubleClick={handleShowDetails}>
        <div className="flex gap-2 self-stretch my-1 mx-2 items-center">
          <div className="w-2 h-2 rounded-full bg-fullcalendar-event"></div>
          <span className="text-shade-700 text-sm">
            {event.resource?.startTime}-{event.resource?.endTime}
          </span>
          <span className="text-shade-700 font-bold text-sm">{event.resource?.eventTypeName}</span>
        </div>
      </button>
    )
  } else if (view === 'week' || view == 'day') {
    eventComponent = (
      <div
        className="rbc-event"
        style={{
          left: `${style?.xOffset}%`,
          top: `${style?.top}%`,
          width: `${style?.width}%`,
          height: `${style?.height}%`,
        }}
      >
        <button className="service-advisor-calendar-event-button" onDoubleClick={handleShowDetails}>
          <div className="flex items-start justify-start h-full">
            <span className="text-sm text-wrap break-all self">
              {event.resource?.startTime}-{event.resource?.endTime} {event.resource?.eventTypeName}
            </span>
          </div>
        </button>
      </div>
    )
  }
  return (
    <>
      {eventComponent}
      <ServiceAdvisorCalendarEntryDetails
        entry={event}
        ref={overlayRef}
        onClose={handleCloseDetails}
        isInsideShowMorePopup={isInsideShowMorePopup}
      />
    </>
  )
}
