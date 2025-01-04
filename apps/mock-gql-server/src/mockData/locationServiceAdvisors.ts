export type MockedGqlLocationServiceAdvisor = {
  id: string
  number: string
  name: string
  surname: string
  receptionInterval: number
}

export const locationServiceAdvisors: MockedGqlLocationServiceAdvisor[] = [
  {
    id: '111e1111-e11b-11d1-a116-112233440000',
    name: 'Patrick',
    surname: 'Müller',
    number: '123456',
    receptionInterval: 30,
  },
  {
    id: '111e1111-e11b-11d1-a116-112233440001',
    name: 'Thomas',
    surname: 'Lautner',
    number: '123456',
    receptionInterval: 15,
  },
  {
    id: '111e1111-e11b-11d1-a116-112233440002',
    name: 'Patrick',
    surname: 'Müller',
    number: '123456',
    receptionInterval: 30,
  },
  {
    id: '111e1111-e11b-11d1-a116-112233440003',
    name: 'Daniel',
    surname: 'Radwechsel',
    number: '123456',
    receptionInterval: 30,
  },
  {
    id: '111e1111-e11b-11d1-a116-112233440004',
    name: 'Philipe',
    surname: 'Counter',
    number: '123456',
    receptionInterval: 15,
  },
  {
    id: '111e1111-e11b-11d1-a116-112233440005',
    name: 'Lucas',
    surname: 'Schwarzeneger',
    number: '123456',
    receptionInterval: 45,
  },
]

export const serviceAdvisor: MockedGqlLocationServiceAdvisor = {
  id: '111e1111-e11b-11d1-a116-112233440000',
  name: 'Patrick',
  surname: 'Müller',
  number: '123456',
  receptionInterval: 30,
}

type MockedGqlServiceAdvisorCalendar = {
  workDays: {
    date: string
    startTime: string
    endTime: string
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

export const serviceAdvisorCalendar: MockedGqlServiceAdvisorCalendar = {
  workDays: [
    {
      date: '2024-12-10',
      endTime: '18:00',
      startTime: '10:00',
    },
    {
      date: '2024-12-11',
      endTime: '18:00',
      startTime: '10:00',
    },
    {
      date: '2024-12-12',
      endTime: '17:00',
      startTime: '09:00',
    },
    {
      date: '2024-12-13',
      endTime: '18:00',
      startTime: '10:00',
    },
    {
      date: '2024-12-14',
      endTime: '18:00',
      startTime: '10:00',
    },
    {
      date: '2024-12-17',
      endTime: '18:00',
      startTime: '10:00',
    },
  ],
  calendar: {
    entries: [
      {
        // non full day, not periodic, signle day event,
        id: '1',
        type: 'ADVISOR_BUFFER',
        isFullDay: false,
        startDate: '2024-12-10',
        endDate: '2024-12-10',
        startTime: '08:00',
        endTime: '16:00',
        isEditable: false,
        period: 'NONE',
        periodicEnd: null,
      },
      {
        // non full day, not periodic, signle day event,
        id: '1',
        type: 'ADVISOR_BREAK',
        isFullDay: false,
        startDate: '2024-12-10',
        endDate: '2024-12-10',
        startTime: '08:00',
        endTime: '16:00',
        isEditable: false,
        period: 'NONE',
        periodicEnd: null,
      },
      {
        // non full day, not periodic, signle day event,
        id: '1',
        type: 'ADVISOR_BREAK',
        isFullDay: false,
        startDate: '2024-12-10',
        endDate: '2024-12-10',
        startTime: '08:00',
        endTime: '16:00',
        isEditable: false,
        period: 'NONE',
        periodicEnd: null,
      },
      {
        // non full day, not periodic, signle day event,
        id: '1',
        type: 'ADVISOR_BREAK',
        isFullDay: false,
        startDate: '2024-12-10',
        endDate: '2024-12-10',
        startTime: '08:00',
        endTime: '16:00',
        isEditable: false,
        period: 'NONE',
        periodicEnd: null,
      },
      {
        //non full day, periodic, single day event, period longer than one month
        id: '2',
        type: 'ADVISOR_BREAK',
        isFullDay: false,
        startDate: '2024-12-02',
        endDate: '2024-12-02',
        startTime: '10:00',
        endTime: '11:00',
        isEditable: false,
        period: 'WEEKLY',
        periodicEnd: '2025-12-16',
      },
      {
        //non full day, periodic, single day event, period shorter than one month
        id: '3',
        type: 'ADVISOR_BUFFER',
        isFullDay: false,
        startDate: '2024-12-03',
        endDate: '2024-12-03',
        startTime: '10:00',
        endTime: '11:00',
        isEditable: false,
        period: 'WEEKLY',
        periodicEnd: '2024-12-16',
      },
      {
        //  full day, not periodic, signle day event,
        id: '4',
        type: 'ADVISOR_ABSENCE',
        isFullDay: true,
        startDate: '2024-12-19',
        endDate: '2024-12-19',
        startTime: null,
        endTime: null,
        isEditable: false,
        period: 'NONE',
        periodicEnd: null,
      },
      {
        //  full day, not periodic, multiple day event,
        id: '5',
        type: 'ADVISOR_ABSENCE',
        isFullDay: true,
        startDate: '2024-12-16',
        endDate: '2024-12-20',
        startTime: null,
        endTime: null,
        isEditable: false,
        period: 'NONE',
        periodicEnd: null,
      },
      {
        //  full day, periodic, single day event, period longer than one month
        id: '6',
        type: 'ADVISOR_ABSENCE',
        isFullDay: true,
        startDate: '2024-12-04',
        endDate: '2024-12-04',
        startTime: null,
        endTime: null,
        isEditable: false,
        period: 'WEEKLY',
        periodicEnd: '2025-12-16',
      },
      {
        //  full day, periodic, single day event, period shorter than one month
        id: '7',
        type: 'ADVISOR_ABSENCE',
        isFullDay: true,
        startDate: '2024-12-05',
        endDate: '2024-12-05',
        startTime: null,
        endTime: null,
        isEditable: false,
        period: 'WEEKLY',
        periodicEnd: '2024-12-16',
      },
      {
        //  full day, periodic, multiple day event, period longer than one month
        id: '8',
        type: 'ADVISOR_ABSENCE',
        isFullDay: true,
        startDate: '2024-12-02',
        endDate: '2024-12-04',
        startTime: null,
        endTime: null,
        isEditable: false,
        period: 'WEEKLY',
        periodicEnd: '2025-12-16',
      },
      {
        //  full day, periodic, multiple day event, period shorter than one month
        id: '9',
        type: 'ADVISOR_ABSENCE',
        isFullDay: true,
        startDate: '2024-12-06',
        endDate: '2024-12-07',
        startTime: null,
        endTime: null,
        isEditable: false,
        period: 'WEEKLY',
        periodicEnd: '2024-12-16',
      },
    ],
  },
}
