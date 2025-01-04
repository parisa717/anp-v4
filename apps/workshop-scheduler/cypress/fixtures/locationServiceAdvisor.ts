export const GET_LOCATION_SERVICE_ADVISORS_DEFAULT_RESPONSE = {
  getLocationServiceAdvisors: {
    serviceAdvisors: [
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
    ],
  },
}

export const GET_SERVICE_ADVISOR_DEFAULT_RESPONSE = {
  getServiceAdvisor: {
    id: '111e1111-e11b-11d1-a116-112233440000',
    name: 'Patrick',
    surname: 'Müller',
    number: '123456',
    receptionInterval: 30,
  },
}

export const GET_SERVICE_ADVISOR_CALENDAR_DEFAULT_RESPONSE = {
  getServiceAdvisorCalendar: {
    workDays: [],
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
          id: '2',
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
          //non full day, periodic, single day event, period shorter than one month
          id: '3',
          type: 'ADVISOR_BUFFER',
          isFullDay: false,
          startDate: '2024-12-04',
          endDate: '2024-12-04',
          startTime: '10:00',
          endTime: '11:00',
          isEditable: false,
          period: 'WEEKLY',
          periodicEnd: '2024-12-16',
        },
      ],
    },
  },
}
