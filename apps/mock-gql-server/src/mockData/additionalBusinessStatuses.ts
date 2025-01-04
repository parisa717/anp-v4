export type MockedGqlAdditionalBusinessStatus = {
  id: string
  name: string
  isActive: boolean
  isDefault: boolean
  isHighlighted: boolean
}

export const additionalBusinessStatuses: MockedGqlAdditionalBusinessStatus[] = [
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
  {
    id: '4',
    name: 'Mobile service',
    isActive: true,
    isDefault: false,
    isHighlighted: false,
  },
  {
    id: '5',
    name: 'Night Setting',
    isActive: true,
    isDefault: false,
    isHighlighted: false,
  },
  {
    id: '6',
    name: 'Special appointment',
    isActive: false,
    isDefault: false,
    isHighlighted: false,
  },
]
