import { GraphQLError } from 'graphql/error'

import { CounterErrorCode } from '@/entities/locationCounter'

export const GET_COUNTER_CALENDAR_WORKING_DAYS = {
  getLocationCounterCalendar: {
    workDays: [
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
    ],
  },
}

export const UPDATE_LOCATION_COUNTER_CALENDAR_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Counter not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateLocationCounterCalendar'],
  extensions: {
    code: CounterErrorCode.COUNTER_NOT_FOUND,
    message: 'Counter not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}

export const GET_LOCATION_COUNTER_CALENDAR_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Counter not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['getLocationCounterCalendar'],
  extensions: {
    code: CounterErrorCode.COUNTER_NOT_FOUND,
    message: 'Counter not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}
