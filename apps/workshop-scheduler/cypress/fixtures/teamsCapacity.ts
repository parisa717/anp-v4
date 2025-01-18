import { GraphQLError } from 'graphql/error'

import { CapacityErrorCode } from '@/entities/teamsCapacity'

export const GET_TEAM_CAPACITY = {
  getTeamCapacity: {
    id: '550e8400-e29b-41d4-a716-446655440000',
    capacity: 600,
    qualificationName: 'Mechanics',
    date: '2011-10-07',
  },
}

export const GET_LOCATION_TEAMS_CALENDAR = {
  getLocationTeamsCalendar: {
    days: [
      {
        date: '2025-01-02',
        capacities: [
          {
            teamId: '24a7bd98-e763-43c2-ac58-b840a4d60b5f',
            capacity: 600,
            qualificationName: 'Mechanics',
          },
          {
            teamId: '0cfcedc3-0144-4fdb-8bf3-a707144122f3',
            capacity: 300,
            qualificationName: 'Painters',
          },
          {
            teamId: 'f7f27f82-31de-4904-9c98-add7783f8d28',
            capacity: 10,
            qualificationName: 'Special forces',
          },
        ],
      },
      {
        date: '2025-01-01',
        capacities: [
          {
            teamId: '24a7bd98-e763-43c2-ac58-b840a4d60b5f',
            capacity: 600,
            qualificationName: 'Mechanics',
          },
          {
            teamId: '0cfcedc3-0144-4fdb-8bf3-a707144122f3',
            capacity: 300,
            qualificationName: 'Painters',
          },
          {
            teamId: 'f7f27f82-31de-4904-9c98-add7783f8d28',
            capacity: 10,
            qualificationName: 'Special forces',
          },
        ],
      },
      {
        date: '2025-01-03',
        capacities: [
          {
            teamId: '24a7bd98-e763-43c2-ac58-b840a4d60b5f',
            capacity: 600,
            qualificationName: 'Mechanics',
          },
          {
            teamId: '0cfcedc3-0144-4fdb-8bf3-a707144122f3',
            capacity: 300,
            qualificationName: 'Painters',
          },
          {
            teamId: 'f7f27f82-31de-4904-9c98-add7783f8d28',
            capacity: 10,
            qualificationName: 'Special forces',
          },
        ],
      },
      {
        date: '2025-01-04',
        capacities: [
          {
            teamId: '24a7bd98-e763-43c2-ac58-b840a4d60b5f',
            capacity: 600,
            qualificationName: 'Mechanics',
          },
          {
            teamId: '0cfcedc3-0144-4fdb-8bf3-a707144122f3',
            capacity: 300,
            qualificationName: 'Painters',
          },
          {
            teamId: 'f7f27f82-31de-4904-9c98-add7783f8d28',
            capacity: 10,
            qualificationName: 'Special forces',
          },
        ],
      },
      {
        date: '2025-01-05',
        capacities: [
          {
            teamId: '24a7bd98-e763-43c2-ac58-b840a4d60b5f',
            capacity: 600,
            qualificationName: 'Mechanics',
          },
          {
            teamId: '0cfcedc3-0144-4fdb-8bf3-a707144122f3',
            capacity: 300,
            qualificationName: 'Painters',
          },
          {
            teamId: 'f7f27f82-31de-4904-9c98-add7783f8d28',
            capacity: 10,
            qualificationName: 'Special forces',
          },
        ],
      },
    ],
    calendar: {
      entries: [
        {
          id: '3b7a729d-d0e1-43d1-ac33-7688aa65279a',
          type: 'BUFFER',
          isFullDay: false,
          startTime: '08:00',
          endTime: '16:00',
          startDate: '2025-01-01',
          endDate: '2025-01-01',
          period: 'NONE',
          periodicEnd: null,
          isEditable: false,
        },
        {
          id: '6a255e05-78b5-4ac4-9321-21215fd56ed2',
          type: 'MEETING',
          isFullDay: false,
          startTime: '11:00',
          endTime: '21:00',
          startDate: '2025-01-03',
          endDate: '2025-01-03',
          period: 'NONE',
          periodicEnd: null,
          isEditable: false,
        },
        {
          id: '9f8ac6ac-07ee-4efc-a8d6-325772bb0ebc',
          type: 'MEETING',
          isFullDay: true,
          startTime: null,
          endTime: null,
          startDate: null,
          endDate: null,
          period: 'NONE',
          periodicEnd: null,
          isEditable: false,
        },
        {
          id: '6b9c6313-21a5-4f09-9b55-10dc5c84b4ff',
          type: 'MEETING',
          isFullDay: true,
          startTime: null,
          endTime: null,
          startDate: null,
          endDate: null,
          period: 'NONE',
          periodicEnd: null,
          isEditable: true,
        },
        {
          id: 'b2a863e8-e84f-4364-a83e-6e80f5dc82f3',
          type: 'MEETING',
          isFullDay: false,
          startTime: '08:00',
          endTime: '16:00',
          startDate: '2025-01-01',
          endDate: '2025-01-01',
          period: 'NONE',
          periodicEnd: null,
          isEditable: true,
        },
      ],
    },
  },
}

export const GET_LOCATION_TEAMS_CALENDAR_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Location not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['getLocationTeamsCalendar'],
  extensions: {
    code: CapacityErrorCode.CAPACITY_LOCATION_NOT_FOUND,
    message: 'Location not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}

export const GET_TEAM_CAPACITY_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Team not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['getTeamCapacity'],
  extensions: {
    code: CapacityErrorCode.CAPACITY_TEAM_NOT_FOUND,
    message: 'Team not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}

export const UPDATE_TEAM_CAPACITY_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Team not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateTeamCapacity'],
  extensions: {
    code: CapacityErrorCode.CAPACITY_TEAM_NOT_FOUND,
    message: 'Team not found.',
    context: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  },
}
