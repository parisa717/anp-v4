import { MockedGqlWorkshopWork } from '../../mockData'
import { PaginationInput, SortInput } from '../types'
import { WorkshopWorksFilterInput } from './types'

export const filterWorks = (
  works: MockedGqlWorkshopWork[],
  filter?: WorkshopWorksFilterInput,
): MockedGqlWorkshopWork[] => {
  if (!filter) return works

  return works.filter((work) => {
    if (filter.name && !work.name.toLowerCase().includes(filter.name.toLowerCase())) {
      return false
    }

    if (filter.brand && filter.brand.length > 0) {
      if (!work.brandIds.some((brandId) => filter.brand?.includes(brandId))) {
        return false
      }
    }

    if (filter.qualification && filter.qualification.length > 0) {
      if (!filter.qualification.includes(work.qualificationId)) {
        return false
      }
    }

    if (typeof filter.isCapacityEditable === 'boolean') {
      if (work.isCapacityEditable !== filter.isCapacityEditable) {
        return false
      }
    }

    if (typeof filter.isDescriptionEditable === 'boolean') {
      if (work.isDescriptionEditable !== filter.isDescriptionEditable) {
        return false
      }
    }

    return true
  })
}

export const sortWorks = (works: MockedGqlWorkshopWork[], sort?: SortInput): MockedGqlWorkshopWork[] => {
  if (!sort) return works

  return [...works].sort((a, b) => {
    let comparison = 0

    switch (sort.field) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'qualification':
        comparison = a.qualificationId.localeCompare(b.qualificationId)
        break
      case 'isCapacityEditable':
        comparison = Number(a.isCapacityEditable) - Number(b.isCapacityEditable)
        break
      case 'isDescriptionEditable':
        comparison = Number(a.isDescriptionEditable) - Number(b.isDescriptionEditable)
        break
      case 'isActive':
        comparison = Number(a.isActive) - Number(b.isActive)
        break
      default:
        return 0
    }

    return sort.direction === 'DESC' ? -comparison : comparison
  })
}

export const paginateWorks = (
  works: MockedGqlWorkshopWork[],
  pagination?: PaginationInput,
): {
  works: MockedGqlWorkshopWork[]
  totalResults: number
} => {
  const limit = pagination?.limit ?? 10
  const offset = pagination?.offset ?? 0

  return {
    works: works.slice(offset, offset + limit),
    totalResults: works.length,
  }
}
