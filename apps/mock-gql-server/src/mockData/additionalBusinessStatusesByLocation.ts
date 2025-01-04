export type MockedGqlAdditionalBusinessStatusByLocation = {
  id: string
  name: string
  isActive: boolean
  isDefault: boolean
  isHighlighted: boolean
}

export const additionalBusinessStatusesByLocation: MockedGqlAdditionalBusinessStatusByLocation[] = [
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
    id: '4',
    name: 'Mobile service',
    isActive: true,
    isDefault: false,
    isHighlighted: false,
  },
]
