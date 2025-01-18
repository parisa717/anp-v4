import { GraphQLError } from 'graphql/error'

import { LocationOverbookingErrorCode } from '@/entities/locationOverbooking'

export const MINIMUM_OVERBOOKING_MULTIPLIER = 1.1
export const CAPACITY_OVERBOOKING_MULTIPLIER = 1.5
export const MAX_CAPACITY_MULTIPLIER = 1.8
export const GET_LOCATION_OVERBOOKING_DEFAULT_RESPONSE = {
  getLocationOverbooking: {
    minimumOverbookingMultiplier: MINIMUM_OVERBOOKING_MULTIPLIER,
    capacityOverbookingMultiplier: CAPACITY_OVERBOOKING_MULTIPLIER,
    maxCapacityMultiplier: MAX_CAPACITY_MULTIPLIER,
  },
}

export const GET_LOCATION_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Overbooking for the location not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['getLocationOverbooking'],
  extensions: {
    code: LocationOverbookingErrorCode.LOCATION_OVERBOOKING_OVERBOOKING_FOR_LOCATION_NOT_FOUND,
    message: 'Overbooking for the location not found.',
    context: {
      id: '55023400-eg5b-4564-iu16-4466554k8h00',
    },
  },
}

export const UPDATE_LOCATION_MINIMAL_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Location not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateLocationMinimalOverbooking'],
  extensions: {
    code: LocationOverbookingErrorCode.LOCATION_OVERBOOKING_LOCATION_NOT_FOUND,
    message: 'Location not found.',
    context: {
      id: '55023400-eg5b-4564-iu16-4466554k8h00',
    },
  },
}

export const UPDATE_LOCATION_OVERBOOKING_SERVER_SIDE_ERROR_RESPONSE: Partial<GraphQLError> = {
  message: 'Overbooking for the location not found.',
  locations: [
    {
      line: 2,
      column: 3,
    },
  ],
  path: ['updateLocationOverbooking'],
  extensions: {
    code: LocationOverbookingErrorCode.LOCATION_OVERBOOKING_OVERBOOKING_FOR_LOCATION_NOT_FOUND,
    message: 'Overbooking for the location not found.',
    context: {
      id: '55023400-eg5b-4564-iu16-4466554k8h00',
    },
  },
}
