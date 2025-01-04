export type MockedGqlBusinessStatus = {
  id: string
  name: string
  isActive: boolean
  isDefault: boolean
}

export const businessStatuses: MockedGqlBusinessStatus[] = [
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
]
