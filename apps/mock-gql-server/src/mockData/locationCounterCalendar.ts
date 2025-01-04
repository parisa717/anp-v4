export type MockedGqlLocationCounterCalendarWorkDays = {
  dayNumber: number
  startTime: string
  endTime: string
  breaks: {
    startTime: string
    endTime: string
  }[]
}

export const locationCounterCalendarWorkDays: MockedGqlLocationCounterCalendarWorkDays[] = [
  {
    dayNumber: 1,
    startTime: '08:00',
    endTime: '19:00',
    breaks: [],
  },
  {
    dayNumber: 2,
    startTime: '08:00',
    endTime: '19:00',
    breaks: [],
  },
  {
    dayNumber: 3,
    startTime: '06:00',
    endTime: '16:00',
    breaks: [
      {
        startTime: '07:30',
        endTime: '8:00',
      },
      {
        startTime: '11:30',
        endTime: '12:00',
      },
    ],
  },
  {
    dayNumber: 4,
    startTime: '08:00',
    endTime: '19:00',
    breaks: [],
  },
  {
    dayNumber: 5,
    startTime: '08:00',
    endTime: '19:00',
    breaks: [],
  },
  {
    dayNumber: 6,
    startTime: '08:00',
    endTime: '19:00',
    breaks: [],
  },
]
