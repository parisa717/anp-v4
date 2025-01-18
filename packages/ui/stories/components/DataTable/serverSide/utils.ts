import { PrimeReactFiltersDefs } from '@nexus-ui/utils'

import { mockBrands, mockQualifications } from './mockData'
import { MockedGqlWorkshopWork } from './types'

export const transformWorkToEntity = (work: MockedGqlWorkshopWork) => ({
  ...work,
  brands: work.brandIds.map((id) => mockBrands[id]),
  qualification: mockQualifications[work.qualificationId],
})

export const mockServerSideOperations = {
  filterWorks: (works: MockedGqlWorkshopWork[], filters: PrimeReactFiltersDefs) => {
    return works.filter((work) => {
      if (filters.name?.value && !work.name.toLowerCase().includes(filters.name.value.toLowerCase())) {
        return false
      }

      if (filters.brand.value && filters.brand.value.length > 0) {
        if (!work.brandIds.some((brandId) => filters.brand.value.includes(mockBrands[brandId].id))) {
          return false
        }
      }

      if (filters.qualification.value && filters.qualification.value.length > 0) {
        const qualificationId = mockQualifications[work.qualificationId].id
        if (!filters.qualification.value.includes(qualificationId)) {
          return false
        }
      }

      if (typeof filters.isCapacityEditable?.value === 'boolean') {
        if (work.isCapacityEditable !== filters.isCapacityEditable.value) {
          return false
        }
      }

      if (typeof filters.isDescriptionEditable?.value === 'boolean') {
        if (work.isDescriptionEditable !== filters.isDescriptionEditable.value) {
          return false
        }
      }

      return true
    })
  },

  sortWorks: (works: MockedGqlWorkshopWork[], field: string, order: number) => {
    if (!field) return works

    return [...works].sort((a, b) => {
      let comparison = 0

      switch (field) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'qualification':
          comparison = mockQualifications[a.qualificationId].name.localeCompare(
            mockQualifications[b.qualificationId].name,
          )
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

      return order === 1 ? comparison : -comparison
    })
  },

  paginateWorks: (works: MockedGqlWorkshopWork[], page: number, pageSize: number) => {
    const offset = page * pageSize
    return {
      works: works.slice(offset, offset + pageSize),
      totalResults: works.length,
    }
  },
}
