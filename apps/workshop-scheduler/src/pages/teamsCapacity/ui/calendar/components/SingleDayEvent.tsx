import { Event, EventProps } from 'react-big-calendar'

export const SingleDayEvent = (event: EventProps<Event>) => {
  return <div className="h-64 py-2.5 px-1">{event.title}</div>
}
