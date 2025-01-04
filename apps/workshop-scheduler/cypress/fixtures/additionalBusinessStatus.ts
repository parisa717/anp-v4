import { GraphQLError } from 'graphql/error'

import {
  ActivateAdditionalBusinessStatusMutation,
  AssignAdditionalBusinessStatusesToLocationMutation,
  CreateAdditionalBusinessStatusesMutation,
  DeactivateAdditionalBusinessStatusMutation,
  EditAdditionalBusinessStatusMutation,
  GetAdditionalBusinessStatusesQuery,
  GetAdditionalBusinessStatusQuery,
} from '@/entities/additionalBusinessStatus/api/AdditionalBusinessStatus.generated'
import { BusinessStatusErrorCode } from '@/entities/businessStatus'

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
    createAdditionalBusinessStatuses: {
      status: true,
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
    code: BusinessStatusErrorCode.ADDITIONAL_BUSINESS_STATUS_EXISTS,
    message: 'Additional business status already exists.',
    context: {
      name: 'Status 1',
    },
  },
}

export const EDIT_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: EditAdditionalBusinessStatusMutation = {
  updateWorkshopAppointmentAdditionalBusinessStatus: {
    status: true,
  },
}

export const ACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: ActivateAdditionalBusinessStatusMutation =
  {
    activateWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }

export const DEACTIVATE_ADDITIONAL_BUSINESS_STATUS_OPERATION_DEFAULT_RESPONSE: DeactivateAdditionalBusinessStatusMutation =
  {
    deactivateWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }

export const ASSIGN_ADDITIONAL_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE: AssignAdditionalBusinessStatusesToLocationMutation =
  {
    assignLocationWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }
