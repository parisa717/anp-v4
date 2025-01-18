import { GraphQLError } from 'graphql/error'

import { FollowUpWorkErrorCode } from '@/entities/followUpWork'
import { GetWorkshopFollowUpWorksQuery } from '@/entities/followUpWork/api/FollowUpWork.generated'

export const GET_WORKSHOP_FOLLOW_UP_WORKS_DEFAULT_RESPONSE: GetWorkshopFollowUpWorksQuery = {
  getWorkshopFollowUpWorks: {
    works: [
      {
        id: '1',
        name: 'Suspension and Steering Service',
        timeUnits: 800,
        isCapacityEditable: true,
        isDescriptionEditable: false,
        isActive: true,
        qualification: {
          id: '1',
          name: 'Brake and Transmission Technicians',
        },
      },
      {
        id: '2',
        name: 'Battery Service',
        timeUnits: 600,
        isCapacityEditable: true,
        isDescriptionEditable: true,
        isActive: true,
        qualification: {
          id: '2',
          name: 'Electrical Systems Technicians',
        },
      },
      {
        id: '3',
        name: 'Check brake, replace if necessary',
        timeUnits: 700,
        isCapacityEditable: true,
        isDescriptionEditable: false,
        isActive: true,
        qualification: {
          id: '3',
          name: 'Mechanics',
        },
      },
      {
        id: '4',
        name: 'Engine Diagnostics',
        timeUnits: 900,
        isCapacityEditable: false,
        isDescriptionEditable: true,
        isActive: true,
        qualification: {
          id: '3',
          name: 'Mechanics',
        },
      },
      {
        id: '5',
        name: 'Electrical System Service',
        timeUnits: 800,
        isCapacityEditable: true,
        isDescriptionEditable: false,
        isActive: true,
        qualification: {
          id: '3',
          name: 'Mechanics',
        },
      },
    ],
  },
}

export const FOLLOWUP_WORK = {
  id: '1',
  name: 'Suspension and Steering Service',
  timeUnits: 100,
  isCapacityEditable: false,
  isDescriptionEditable: false,
  isActive: true,
  qualification: { id: '0', name: 'Mechanics' },
}

export const CREATE_WORKSHOP_FOLLOW_UP_WORK_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Follow Up Work already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['createWorkshopFollowUpWork'],
  extensions: {
    code: FollowUpWorkErrorCode.FOLLOW_UP_WORK_ALREADY_EXISTS,
    message: 'Follow Up Work already exists.',
    context: {
      name: 'Follow Up Work 1',
    },
  },
}
