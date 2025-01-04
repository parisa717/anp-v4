export type MockedGqlSimplifiedBrand = {
  id: string
  code: string
  isWorkshopDefault: boolean
}

export const simplifiedBrands: MockedGqlSimplifiedBrand[] = [
  {
    id: 'brand_1',
    code: 'Opel',
    isWorkshopDefault: true,
  },
  {
    id: 'brand_2',
    code: 'Kia',
    isWorkshopDefault: false,
  },
  {
    id: 'brand_3',
    code: 'Nissan',
    isWorkshopDefault: false,
  },
]
