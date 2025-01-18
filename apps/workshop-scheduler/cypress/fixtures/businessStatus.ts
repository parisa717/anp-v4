import { GraphQLError } from 'graphql/error'

import { BusinessStatusErrorCode } from '@/entities/businessStatus'
import {
  ActivateBusinessStatusMutation,
  CreateBusinessStatusesMutation,
  DeactivateBusinessStatusMutation,
  EditBusinessStatusMutation,
  GetBusinessStatusesQuery,
  GetBusinessStatusQuery,
} from '@/entities/businessStatus/api/BusinessStatus.generated'

export const CREATE_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE = (ids: string[]): CreateBusinessStatusesMutation => {
  return {
    createWorkshopAppointmentBusinessStatus: {
      businessStatuses: ids.map((id) => ({ id })),
    },
  }
}

export const CREATE_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Business status already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['createWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: BusinessStatusErrorCode.BUSINESS_STATUS_EXISTS,
    message: 'Business status already exists.',
    context: {
      name: 'Status 1',
    },
  },
}

export const CREATE_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_VALIDATION_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Invalid data',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['createWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: 1724067624,
    message: 'Invalid data',
    context: {
      fields: {
        'businessStatuses.0': {
          children: {
            name: {
              errors: [
                {
                  messageKey: 'validation.minLength',
                  context: {
                    length: '2',
                    value: 'A',
                  },
                  plurality: null,
                },
              ],
            },
          },
        },
        'businessStatuses.1.name': {
          errors: [
            {
              messageKey: 'validation.maxLength',
              context: {
                length: '4',
                value: 'ABCDEFGH',
              },
              plurality: null,
            },
          ],
        },
      },
    },
  },
}

export const EDIT_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: EditBusinessStatusMutation = {
  updateWorkshopAppointmentBusinessStatus: {
    status: true,
  },
}

export const EDIT_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Business status already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: BusinessStatusErrorCode.BUSINESS_STATUS_EXISTS,
    message: 'Business status already exists.',
    context: {
      name: 'Status 1',
    },
  },
}

export const ACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: ActivateBusinessStatusMutation = {
  activateWorkshopAppointmentBusinessStatus: {
    status: true,
  },
}

export const ACTIVATE_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'At least one business status should be active.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['activateWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: BusinessStatusErrorCode.BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE,
    message: 'At least one business status should be active.',
  },
}

export const DEACTIVATE_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: DeactivateBusinessStatusMutation = {
  deactivateWorkshopAppointmentBusinessStatus: {
    status: true,
  },
}

export const DEACTIVATE_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'At least one business status should be active.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['deactivateWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: BusinessStatusErrorCode.BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE,
    message: 'At least one business status should be active.',
  },
}

export const DEACTIVATE_BUSINESS_STATUS_WITH_DEFAULT_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Inactive business status cannot be set as default.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['deactivateWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: BusinessStatusErrorCode.BUSINESS_STATUS_INACTIVE_CANNOT_BE_DEFAULT,
    message: 'Inactive business status cannot be set as default.',
  },
}

export const GET_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: GetBusinessStatusQuery = {
  getWorkshopAppointmentBusinessStatus: {
    id: '1',
    name: 'Open',
    isActive: true,
    isDefault: false,
  },
}

export const GET_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE: GetBusinessStatusesQuery = {
  getWorkshopAppointmentBusinessStatuses: {
    businessStatuses: [
      {
        id: '1',
        name: 'Open',
        isActive: true,
        isDefault: true,
      },
      {
        id: '2',
        name: 'Arrived',
        isActive: true,
        isDefault: false,
      },
      {
        id: '3',
        name: 'In Progress',
        isActive: true,
        isDefault: false,
      },
      {
        id: '4',
        name: 'Finished',
        isActive: true,
        isDefault: false,
      },
      {
        id: '5',
        name: 'Blocked',
        isActive: false,
        isDefault: false,
      },
    ],
  },
}

export const ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'At least one business status must be active.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['assignLocationWorkshopAppointmentBusinessStatus'],
  extensions: {
    code: BusinessStatusErrorCode.BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE,
    message: 'At least one business status must be active.',
  },
}
