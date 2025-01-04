export type MockedGqlWorkshopFollowUpWork = {
  id: string
  name: string
  timeUnits: number
  isCapacityEditable: boolean
  isDescriptionEditable: boolean
  isActive: boolean
  qualificationId: string
}

export const workshopFollowUpWorks: MockedGqlWorkshopFollowUpWork[] = [
  {
    id: 'abefc719-4556-4f27-8ab6-3836b133f7b7',
    name: 'Review of the work from main appointment',
    timeUnits: 800,
    isCapacityEditable: true,
    isDescriptionEditable: false,
    isActive: true,
    qualificationId: '2',
  },
  {
    id: '536bcb1b-03c5-410f-9252-165d50cd8a15',
    name: 'Review of the work from main appointment 2',
    timeUnits: 1600,
    isCapacityEditable: true,
    isDescriptionEditable: true,
    isActive: true,
    qualificationId: '1',
  },
]
