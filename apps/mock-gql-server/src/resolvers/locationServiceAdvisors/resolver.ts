import { isWithinInterval } from 'date-fns'

import { locationServiceAdvisors, serviceAdvisor, serviceAdvisorCalendar } from '../../mockData'

export const locationServiceAdvisorsResolver = {
  getLocationServiceAdvisors() {
    return {
      serviceAdvisors: locationServiceAdvisors,
    }
  },
  getServiceAdvisor() {
    return serviceAdvisor
  },
  getServiceAdvisorCalendar(_: unknown, { startDate, endDate }: { startDate: string; endDate: string }) {
    const _startDate = new Date(startDate)
    const _endDate = new Date(endDate)
    return {
      workDays: serviceAdvisorCalendar.workDays.filter((workDay) => {
        const date = new Date(workDay.date)
        return isWithinInterval(date, { end: _endDate, start: _startDate })
      }),
      calendar: {
        ...serviceAdvisorCalendar.calendar,
        entries: serviceAdvisorCalendar.calendar.entries.filter((entry) => {
          const entryStartDate = entry.startDate ? new Date(entry.startDate) : undefined
          const entryEndDate = entry.endDate ? new Date(entry.endDate) : undefined
          return (
            (entryStartDate ? isWithinInterval(entryStartDate, { end: _endDate, start: _startDate }) : true) ||
            (entryEndDate ? isWithinInterval(entryEndDate, { end: _endDate, start: _startDate }) : true)
          )
        }),
      },
    }
  },
}
