import { GraphQLError } from 'graphql/error'

import { AdditionalBusinessStatusErrorCode } from '@/entities/additionalBusinessStatus'
import {
  ActivateAdditionalBusinessStatusMutation,
  AssignAdditionalBusinessStatusesToLocationMutation,
  CreateAdditionalBusinessStatusesMutation,
  DeactivateAdditionalBusinessStatusMutation,
  EditAdditionalBusinessStatusMutation,
  GetAdditionalBusinessStatusesQuery,
  GetAdditionalBusinessStatusQuery,
} from '@/entities/additionalBusinessStatus/api/AdditionalBusinessStatus.generated'

export const GET_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: GetAdditionalBusinessStatusQuery = {
  getWorkshopAppointmentAdditionalBusinessStatus: {
    id: '1',
    name: 'Open',
    isActive: true,
    isDefault: false,
    isHighlighted: false,
  },
}

export const GET_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE: GetAdditionalBusinessStatusesQuery = {
  getWorkshopAppointmentAdditionalBusinessStatuses: {
    additionalBusinessStatuses: [
      {
        id: '1',
        name: 'Normal',
        isActive: true,
        isDefault: true,
        isHighlighted: false,
      },
      {
        id: '2',
        name: 'Customer Waiting',
        isActive: true,
        isDefault: false,
        isHighlighted: true,
      },
      {
        id: '3',
        name: 'Pick-up and delivery service',
        isActive: true,
        isDefault: false,
        isHighlighted: false,
      },
      {
        id: '4',
        name: 'Mobile service',
        isActive: true,
        isDefault: false,
        isHighlighted: false,
      },
      {
        id: '5',
        name: 'Night Setting',
        isActive: true,
        isDefault: false,
        isHighlighted: false,
      },
      {
        id: '6',
        name: 'Special appointment',
        isActive: true,
        isDefault: false,
        isHighlighted: false,
      },
    ],
  },
}

export const CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_DEFAULT_RESPONSE: CreateAdditionalBusinessStatusesMutation =
  {
    createWorkshopAppointmentAdditionalBusinessStatus: {
      additionalBusinessStatuses: [
        {
          id: '1',
        },
      ],
    },
  }

export const CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Additional business status already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['createWorkshopAdditionalAppointmentBusinessStatus'],
  extensions: {
    code: AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_EXISTS,
    message: 'Additional business status already exists.',
    context: {
      name: 'Status 1',
    },
  },
}

export const CREATE_ADDITIONAL_BUSINESS_STATUSES_OPERATION_SERVER_SIDE_VALIDATION_ERROR_RESPONSE: Partial<GraphQLError> =
  {
    message: 'Invalid data',
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: ['createWorkshopAdditionalAppointmentBusinessStatus'],
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

export const EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: EditAdditionalBusinessStatusMutation = {
  updateWorkshopAppointmentAdditionalBusinessStatus: {
    status: true,
  },
}

export const EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Additional business status already exists.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateWorkshopAppointmentAdditionalBusinessStatus'],
  extensions: {
    code: AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_EXISTS,
    message: 'Additional business status already exists.',
    context: {
      name: 'Status 1',
    },
  },
}

export const ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: ActivateAdditionalBusinessStatusMutation =
  {
    activateWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }

export const ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'At least one business status should be active.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['activateWorkshopAppointmentAdditionalBusinessStatus'],
  extensions: {
    code: AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE,
    message: 'At least one additional business status should be active.',
  },
}

export const DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: DeactivateAdditionalBusinessStatusMutation =
  {
    deactivateWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }

export const DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'At least one business status should be active.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['deactivateWorkshopAppointmentAdditionalBusinessStatus'],
  extensions: {
    code: AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE,
    message: 'At least one additional business status should be active.',
  },
}

export const DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_WITH_DEFAULT_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> =
  {
    message: 'Inactive business status cannot be set as default.',
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: ['deactivateWorkshopAppointmentAdditionalBusinessStatus'],
    extensions: {
      code: AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_INACTIVE_CANNOT_BE_DEFAULT,
      message: 'Inactive business status cannot be set as default.',
    },
  }

export const ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE: AssignAdditionalBusinessStatusesToLocationMutation =
  {
    assignLocationWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }

export const ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> =
  {
    message: 'At least one additional business status must be active.',
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: ['assignLocationWorkshopAppointmentAdditionalBusinessStatus'],
    extensions: {
      code: AdditionalBusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_AT_LEAST_ONE_SHOULD_BE_ACTIVE,
      message: 'At least one additional business status must be active.',
    },
  }
