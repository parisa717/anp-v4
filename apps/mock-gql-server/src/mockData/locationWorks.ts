export type MockedGqlLocationWorks = {
  id: string
  locationId: string
  name: string
  amountPerDayLimit: number | null
  capacityPerDayLimit: number | null
  isCapacityEditable: boolean
  isDescriptionEditable: boolean
  brands: { id: string; name: string; timeUnits?: number }[]
  qualification: { id: string; name: string }
  isRecommended: boolean
  workId: string
}

export const locationWorks: MockedGqlLocationWorks[] = [
  {
    id: '1',
    locationId: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Work 1',
    amountPerDayLimit: 6,
    capacityPerDayLimit: 0.4,
    isCapacityEditable: false,
    isDescriptionEditable: false,
    brands: [
      { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Opel', timeUnits: 1000 },
      { id: '550e8400-e29b-41d4-a716-446655440033', name: 'Kia', timeUnits: 1000 },
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
      { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Opel', timeUnits: 1000 },
      { id: '550e8400-e29b-41d4-a716-446655440033', name: 'Kia', timeUnits: 1000 },
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
      { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Opel', timeUnits: 1000 },
      { id: '550e8400-e29b-41d4-a716-446655440033', name: 'Kia', timeUnits: 1000 },
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
    brands: [{ id: '550e8400-e29b-41d4-a716-446655440001', name: 'Opel', timeUnits: 1000 }],
    qualification: { id: 'i80e8400-e29b-41d4-a716-446655440002', name: 'Brake and Transmission Technicians' },
    isRecommended: false,
    workId: '550e8400-e29b-41d4-a716-446655440066',
  },
]

export type MockedGqlLocationWork = {
  id: string
  locationId: string
  name: string
  workId: string
  brands: Array<{ id: string; name: string }>
  qualification: { id: string; name: string }
  amountPerDayLimit: number | null
  capacityPerDayLimit: number | null
  isRecommended: boolean
}

export const locationWork: MockedGqlLocationWork = {
  id: '1',
  locationId: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Work 1',
  brands: [{ id: 'brand_1', name: 'OPEL' }],
  qualification: { id: '550e8400-e29b-41d4-a716-446655440007', name: 'Qaulification 1' },
  isRecommended: true,
  amountPerDayLimit: 50,
  capacityPerDayLimit: null,
  workId: '550e8400-e29b-41d4-a716-446655440000',
}
