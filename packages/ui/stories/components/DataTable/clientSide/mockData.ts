export interface Brand {
  id: number
  name: string
  isActive: boolean
}

export const clientMockData: Brand[] = [
  { id: 1, name: 'Opel', isActive: true },
  { id: 2, name: 'Kia', isActive: false },
  { id: 3, name: 'Nissan', isActive: true },
]
