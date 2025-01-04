import {
  GetAdditionalBusinessStatusesByLocationQuery,
  UnassignAdditionalBusinessStatusFromLocationMutation,
} from '@/entities/additionalBusinessStatus/api/AdditionalBusinessStatus.generated'
import {
  AssignBusinessStatusesToLocationMutation,
  GetBusinessStatusesByLocationQuery,
  UnassignBusinessStatusFromLocationMutation,
} from '@/entities/businessStatus/api/BusinessStatus.generated'

export const GET_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE: GetBusinessStatusesByLocationQuery = {
  getLocationWorkshopAppointmentBusinessStatuses: {
    businessStatuses: [
      {
        id: '1',
        name: 'Open',
        isActive: true,
        isDefault: true,
      },
      {
        id: '3',
        name: 'In Progress',
        isActive: true,
        isDefault: false,
      },
    ],
  },
}

export const GET_ADDITIONAL_BUSINESS_STATUSES_BY_LOCATION_OPERATION_DEFAULT_RESPONSE: GetAdditionalBusinessStatusesByLocationQuery =
  {
    getLocationWorkshopAppointmentAdditionalBusinessStatuses: {
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
      ],
    },
  }

export const ASSIGN_BUSINESS_STATUSES_TO_LOCATION_OPERATION_DEFAULT_RESPONSE: AssignBusinessStatusesToLocationMutation =
  {
    assignLocationWorkshopAppointmentBusinessStatus: {
      status: true,
    },
  }

export const UNASSIGN_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE: UnassignBusinessStatusFromLocationMutation =
  {
    unassignLocationWorkshopAppointmentBusinessStatus: {
      status: true,
    },
  }

export const UNASSIGN_ADDITIONAL_BUSINESS_STATUS_FROM_LOCATION_OPERATION_DEFAULT_RESPONSE: UnassignAdditionalBusinessStatusFromLocationMutation =
  {
    unassignLocationWorkshopAppointmentAdditionalBusinessStatus: {
      status: true,
    },
  }
