import { EventWrapperProps, View } from 'react-big-calendar'

type Props = EventWrapperProps & {
  view: View
}

export const EventWrapper = ({ event, view, style }: Props) => {
  if (event.allDay) {
    return (
      <button className="service-advisor-calendar-event-button mb-1">
        <div className="bg-fullcalendar-event p-1">
          <span className="text-shade-000 text-sm">{event.resource?.eventTypeName}</span>
        </div>
      </button>
    )
  }
  if (view === 'month') {
    return (
      <button className="service-advisor-calendar-event-button">
        <div className="flex gap-2 self-stretch my-1 mx-2 items-center">
          <div className="w-2 h-2 rounded-full bg-fullcalendar-event"></div>
          <span className="text-shade-700 text-sm">
            {event.resource?.timeFrom}-{event.resource?.timeTo}
          </span>
          <span className="text-shade-700 font-bold text-sm">{event.resource?.eventTypeName}</span>
        </div>
      </button>
    )
  }
  if (view === 'week' || view == 'day') {
    return (
      <div
        className="rbc-event"
        style={{
          left: `${style?.xOffset}%`,
          top: `${style?.top}%`,
          width: `${style?.width}%`,
          height: `${style?.height}%`,
        }}
      >
        <button className="service-advisor-calendar-event-button">
          <div className="flex items-start justify-start h-full">
            <span className="text-sm text-wrap break-all self">
              {event.resource?.timeFrom}-{event.resource?.timeTo} {event.resource?.eventTypeName}
            </span>
          </div>
        </button>
      </div>
    )
  }
  return null
}
