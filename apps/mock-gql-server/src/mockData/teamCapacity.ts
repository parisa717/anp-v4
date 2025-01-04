export type MockedGqlTeamCapacity = {
  id: string
  capacity: number
  qualificationName: string
  date: string
}

export const teamCapacity: MockedGqlTeamCapacity = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  capacity: 600,
  qualificationName: 'Mechanics',
  date: '2011-10-07',
}

export type MockedGqlLocationTeamsCalendar = {
  days: {
    date: string | null
    capacities: {
      teamId: string
      capacity: number
      qualificationName: string
    }[]
  }[]
  calendar: {
    entries: {
      id: string
      type: 'ADVISOR_BREAK' | 'ADVISOR_BUFFER' | 'ADVISOR_ABSENCE' | 'PUBLIC_HOLIDAY'
      isFullDay: boolean
      startTime: string | null
      endTime: string | null
      startDate: string | null
      endDate: string | null
      period: 'NONE' | 'WEEKLY'
      periodicEnd: string | null
      isEditable: boolean
    }[]
  }
}

export const locationTeamsCalendar: MockedGqlLocationTeamsCalendar = {
  days: [
    {
      date: '2024-12-16',
      capacities: [
        {
          teamId: '550e8400-e29b-41d4-a716-446655441100',
          capacity: 200,
          qualificationName: 'Brake and Transmission Technicians',
        },
      ],
    },
    {
      date: '2024-12-17',
      capacities: [
        {
          teamId: '550e8400-e29b-41d4-a716-446655440000',
          capacity: 600,
          qualificationName: 'Mechanics',
        },
      ],
    },
    {
      date: '2024-12-18',
      capacities: [
        {
          teamId: '550e8400-e29b-41d4-a716-446655440200',
          capacity: 100,
          qualificationName: 'Car painters',
        },
        {
          teamId: '550e8400-e29b-41d4-a716-446655440000',
          capacity: 300,
          qualificationName: 'Mechanics',
        },
        {
          teamId: '550e8400-e29b-41d4-a716-446655441100',
          capacity: 700,
          qualificationName: 'Brake and Transmission Technicians',
        },
      ],
    },
  ],
  calendar: {
    entries: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        type: 'ADVISOR_BUFFER',
        isFullDay: true,
        startTime: '14:48',
        endTime: '15:30',
        startDate: '2011-10-05',
        endDate: '2011-10-07',
        period: 'NONE',
        periodicEnd: '2011-10-07',
        isEditable: true,
      },
    ],
  },
}
