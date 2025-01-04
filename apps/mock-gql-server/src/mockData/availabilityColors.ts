export type MockedGqlAvailabilityColor = {
  id: string
  color: string
  minimalCapacity: number
  maximumCapacity?: number
}

export const availabilityColors: MockedGqlAvailabilityColor[] = [
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
]
