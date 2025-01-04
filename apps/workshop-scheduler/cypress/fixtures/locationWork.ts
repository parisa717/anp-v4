export const GET_LOCATION_WORKS_DEFAULT_RESPONSE = {
  getLocationWorks: {
    locationWorks: [
      {
        id: '1',
        locationId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Work 1',
        amountPerDayLimit: 6,
        capacityPerDayLimit: 0.4,
        isCapacityEditable: false,
        isDescriptionEditable: false,
        brands: [
          { id: 'brand_1', name: 'Opel', timeUnits: 1000 },
          { id: 'brand_2', name: 'Kia', timeUnits: 1000 },
        ],
        qualification: { id: '55023400-eg5b-4564-iu16-4466554k8h00', name: 'Mechanic' },
        isRecommended: true,
        workId: '550e8400-e29b-41d4-a716-446655440066',
      },
      {
        id: '2',
        locationId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Work 2',
        amountPerDayLimit: 3,
        capacityPerDayLimit: 0.3,
        isCapacityEditable: false,
        isDescriptionEditable: false,
        brands: [
          { id: 'brand_1', name: 'Opel', timeUnits: 1000 },
          { id: 'brand_2', name: 'Kia', timeUnits: 1000 },
        ],
        qualification: { id: '55023400-eg5b-4564-iu16-4466554k8h00', name: 'Mechanic' },
        isRecommended: true,
        workId: '550e8400-e29b-41d4-a716-446655440066',
      },
      {
        id: '3',
        locationId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Work 3',
        amountPerDayLimit: 1,
        capacityPerDayLimit: 1,
        isCapacityEditable: false,
        isDescriptionEditable: true,
        brands: [
          { id: 'brand_1', name: 'Opel', timeUnits: 1000 },
          { id: 'brand_2', name: 'Kia', timeUnits: 1000 },
        ],
        qualification: { id: 'i80e8400-e29b-41d4-a716-446655440002', name: 'Brake and Transmission Technicians' },
        isRecommended: false,
        workId: '550e8400-e29b-41d4-a716-446655440066',
      },
      {
        id: '4',
        locationId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Work 4',
        amountPerDayLimit: 9,
        capacityPerDayLimit: 0.7,
        isCapacityEditable: false,
        isDescriptionEditable: false,
        brands: [],
        qualification: { id: '55023400-eg5b-4564-iu16-4466554k8h00', name: 'Mechanic' },
        isRecommended: true,
        workId: '550e8400-e29b-41d4-a716-446655440066',
      },
      {
        id: '5',
        locationId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Work 5',
        amountPerDayLimit: 10,
        capacityPerDayLimit: 0.5,
        isCapacityEditable: false,
        isDescriptionEditable: false,
        brands: [{ id: 'brand_1', name: 'Opel', timeUnits: 1000 }],
        qualification: { id: 'i80e8400-e29b-41d4-a716-446655440002', name: 'Brake and Transmission Technicians' },
        isRecommended: false,
        workId: '550e8400-e29b-41d4-a716-446655440066',
      },
    ],
  },
}

export const GET_LOCATION_WORK_DEFAULT_RESPONSE = {
  id: '1',
  locationId: '1',
  name: 'Work 1',
  amountPerDayLimit: 50,
  capacityPerDayLimit: null,
  isCapacityEditable: false,
  isDescriptionEditable: false,
  brands: [
    { id: 'brand_1', name: 'Opel', timeUnits: 1000 },
    { id: 'brand_2', name: 'Kia', timeUnits: 1000 },
  ],
  qualification: { id: '55023400-eg5b-4564-iu16-4466554k8h00', name: 'Mechanic' },
  isRecommended: true,
  workId: '1',
}

export const UPDATE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE = {
  status: true,
}

export const DELETE_LOCATION_WORK_OPERATION_DEFAULT_RESPONSE = {
  status: true,
}
