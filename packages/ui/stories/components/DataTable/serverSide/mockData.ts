import { MockBrands, MockedGqlWorkshopWork, MockQualifications } from './types'

export const exampleWorkNames = [
  'Suspension and Steering Service',
  'Battery Service',
  'Check brake, replace if necessary',
  'Engine Diagnostics',
  'Electrical System Service',
]

export const generateWorkName = (index: number): string => {
  return exampleWorkNames[index % exampleWorkNames.length]
}

export const generateBrandIds = (index: number): string[] => {
  const baseIndex = index % 5
  switch (baseIndex) {
    case 0:
      return ['brand_1', 'brand_2', 'brand_3']
    case 1:
      return ['brand_1', 'brand_2']
    case 2:
      return ['brand_2', 'brand_3']
    case 3:
      return ['brand_3']
    case 4:
      return ['brand_1', 'brand_2', 'brand_3', 'brand_4']
    default:
      return ['brand_1']
  }
}

export const mockWorks: MockedGqlWorkshopWork[] = Array.from({ length: 100 }, (_, i) => {
  const index = i + 1
  return {
    id: index.toString(),
    name: generateWorkName(i),
    isCapacityEditable: index % 3 !== 0,
    isDescriptionEditable: index % 4 === 0,
    isActive: index % 10 !== 0,
    qualificationId: ((index % 3) + 1).toString(),
    brandIds: generateBrandIds(i),
  }
})

export const mockBrands: MockBrands = {
  brand_1: { id: 'brand_1', name: 'Opel', timeUnits: 200 },
  brand_2: { id: 'brand_2', name: 'BMW', timeUnits: 300 },
  brand_3: { id: 'brand_3', name: 'Mercedes', timeUnits: 400 },
  brand_4: { id: 'brand_4', name: 'Audi', timeUnits: 200 },
}

export const mockQualifications: MockQualifications = {
  '1': { id: '1', name: 'Mechanics' },
  '2': { id: '2', name: 'Brake and Transmission Technicians' },
  '3': { id: '3', name: 'Electrical Systems Technicians' },
}
