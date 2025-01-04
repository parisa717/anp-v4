export type MockedGqlBusinessStatusByLocation = {
  id: string
  name: string
  isActive: boolean
  isDefault: boolean
}

export const businessStatusesByLocation: MockedGqlBusinessStatusByLocation[] = [
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
]
