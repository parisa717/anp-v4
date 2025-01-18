export type MockedGqlWorkshopWork = {
  id: string
  name: string
  isCapacityEditable: boolean
  isDescriptionEditable: boolean
  isActive: boolean
  qualificationId: string
  brandIds: string[]
}

export type MockBrands = {
  [key: string]: {
    id: string
    name: string
    timeUnits: number
  }
}

export type MockQualifications = {
  [key: string]: {
    id: string
    name: string
  }
}

export type StoryMockWorkEntity = MockedGqlWorkshopWork & {
  brands: {
    id: string
    name: string
    timeUnits: number
  }[]
  qualification: {
    id: string
    name: string
  }
}
