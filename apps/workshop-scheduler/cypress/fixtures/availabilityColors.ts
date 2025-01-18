import { GraphQLError } from 'graphql/error'

import { AvailabilityColorErrorCode } from '@/entities/availabilityColor'
import {
  GetAvailabilityColorsQuery,
  UpdateAvailabilityColorsMutation,
} from '@/entities/availabilityColor/api/AvailabilityColor.generated'

export const GET_AVAILABILITY_COLORS_DEFAULT_RESPONSE: GetAvailabilityColorsQuery = {
  getAvailabilityColors: {
    availabilityColors: [
      {
        id: '1',
        color: 'DADEE3',
        minimalCapacity: 0,
        maximalCapacity: 50,
      },
      {
        id: '2',
        color: 'F2D066',
        minimalCapacity: 51,
        maximalCapacity: 70,
      },
      {
        id: '3',
        color: 'FBA86F',
        minimalCapacity: 71,
        maximalCapacity: 100,
      },
      {
        id: '4',
        color: 'FF8780',
        minimalCapacity: 100,
      },
    ],
  },
}

export const UPDATE_AVAILABILITY_COLORS_OPERATION_DEFAULT_RESPONSE: UpdateAvailabilityColorsMutation = {
  updateAvailabilityColors: {
    status: true,
  },
}

export const UPDATE_AVAILABILITY_COLORS_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: '“minimalCapacity” cannot be bigger than the “maximalCapacity”',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateAvailabilityColors'],
  extensions: {
    code: AvailabilityColorErrorCode.AVAILABILITY_COLOR_MIN_HIGHER_THAN_MAX,
    message: '“minimalCapacity” cannot be bigger than the “maximalCapacity”',
    context: {
      id: '55023400-eg5b-4564-iu16-4466554k8h00',
      minimalCapacity: 5,
      maximalCapacity: 3,
    },
  },
}

export const GET_AVAILABILITY_COLORS_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: '“minimalCapacity” cannot be bigger than the “maximalCapacity”',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['getAvailabilityColors'],
  extensions: {
    code: AvailabilityColorErrorCode.AVAILABILITY_COLOR_MIN_HIGHER_THAN_MAX,
    message: '“minimalCapacity” cannot be bigger than the “maximalCapacity”',
    context: {
      id: '55023400-eg5b-4564-iu16-4466554k8h00',
      minimalCapacity: 5,
      maximalCapacity: 3,
    },
  },
}
