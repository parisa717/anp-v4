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
        maximumCapacity: 50,
      },
      {
        id: '2',
        color: 'F2D066',
        minimalCapacity: 51,
        maximumCapacity: 70,
      },
      {
        id: '3',
        color: 'FBA86F',
        minimalCapacity: 71,
        maximumCapacity: 100,
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
