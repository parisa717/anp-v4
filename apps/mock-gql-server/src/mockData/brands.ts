export type MockedGqlBrand = {
  id: string
  code: string
  isActive: boolean
}

export const brands: MockedGqlBrand[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'Opel',
    isActive: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440033',
    code: 'Kia',
    isActive: false,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440111',
    code: 'Nissan',
    isActive: true,
  },
]
