export type MockedGqlWorkshopWork = {
  id: string
  name: string
  isCapacityEditable: boolean
  isDescriptionEditable: boolean
  isActive: boolean
  qualificationId: string
  brandIds: string[]
}

const exampleWorkNames = [
  'Suspension and Steering Service',
  'Battery Service',
  'Check brake, replace if necessary',
  'Engine Diagnostics',
  'Electrical System Service',
]

const generateWorkName = (index: number): string => {
  return exampleWorkNames[index % exampleWorkNames.length]
}

const generateBrandIds = (index: number): string[] => {
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

export const workshopWorks: MockedGqlWorkshopWork[] = Array.from({ length: 100 }, (_, i) => {
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

export type MockedGqlWorkshopWorkDetails = {
  id: string
  name: string
  isCapacityEditable: boolean
  isDescriptionEditable: boolean
  isActive: boolean
  qualification: { id: string; name: string }
  brands: { id: string; name: string; timeUnits: number }[]
}

export const workshopWork: MockedGqlWorkshopWork = {
  id: '1',
  name: 'Suspension and Steering Service',
  isCapacityEditable: false,
  isDescriptionEditable: false,
  isActive: true,
  qualificationId: '1',
  brandIds: ['brand_1', 'brand_2', 'brand_3'],
}
