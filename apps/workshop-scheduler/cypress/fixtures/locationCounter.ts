import { GraphQLError } from 'graphql/error'

import { CounterErrorCode } from '@/entities/locationCounter'

export const GET_COUNTER_RECEPTION_INTERVAL = {
  getLocationCounter: {
    id: 'id',
    receptionInterval: 10,
  },
}

export const UPDATE_LOCATION_COUNTER_RECEPTION_INTERVAL_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Location not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateLocationCounterReceptionInterval'],
  extensions: {
    code: CounterErrorCode.COUNTER_LOCATION_NOT_FOUND,
    message: 'Location not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}

export const GET_LOCATION_COUNTER_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Location not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['getLocationCounter'],
  extensions: {
    code: CounterErrorCode.COUNTER_LOCATION_NOT_FOUND,
    message: 'Location not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}
