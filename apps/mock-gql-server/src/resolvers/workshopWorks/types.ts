export interface WorkshopWorksFilterInput {
  name?: string
  brand?: string[]
  qualification?: string[]
  isCapacityEditable?: boolean
  isDescriptionEditable?: boolean
  excludeServicesAssignedToTheLocation?: string
}
