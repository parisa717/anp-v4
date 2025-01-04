import { GetWorkshopWorksQuery } from '@/entities/work/api/Work.generated'
import {
  GqlGetWorkObjectType,
  PaginationInput,
  SortDirection,
  SortInput,
  WorkshopWorksFilterInput,
} from '@/shared/api/types.generated'

import { GET_BRANDS_OPERATION_DEFAULT_RESPONSE } from './brand'

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
      return ['brand_1', 'brand_2', 'brand_3']
    default:
      return ['brand_1']
  }
}

export const GET_WORKSHOP_WORKS_DEFAULT_RESPONSE: GetWorkshopWorksQuery = {
  getWorkshopWorks: {
    works: Array.from({ length: 100 }, (_, i) => ({
      id: (i + 1).toString(),
      name: generateWorkName(i),
      isCapacityEditable: (i + 1) % 3 !== 0,
      isDescriptionEditable: (i + 1) % 4 === 0,
      isActive: (i + 1) % 10 !== 0,
      qualification: {
        id: ((i % 2) + 1).toString(),
        name: i % 2 ? 'Brake and Transmission Technicians' : 'Mechanics',
      },
      brands: generateBrandIds(i).map((id) => ({
        id,
        name: GET_BRANDS_OPERATION_DEFAULT_RESPONSE.getBrands.brands.find((brand) => brand.id === id)?.code || 'Opel',
        timeUnits: (i + 1) % 2 ? 1000 : 700,
      })),
    })),
    metadata: {
      totalResults: 100,
      sort: {
        field: 'id',
        direction: SortDirection.Asc,
      },
    },
  },
}

export const paginateWorks = (
  works: GetWorkshopWorksQuery['getWorkshopWorks']['works'],
  pagination?: PaginationInput,
): {
  works: GetWorkshopWorksQuery['getWorkshopWorks']['works']
  totalResults: number
} => {
  const limit = pagination?.limit ?? 10
  const offset = pagination?.offset ?? 0

  return {
    works: works.slice(offset, offset + limit),
    totalResults: works.length,
  }
}

export const filterWorks = (
  works: GqlGetWorkObjectType[],
  filter?: WorkshopWorksFilterInput,
): GqlGetWorkObjectType[] => {
  if (!filter) return works

  return works.filter((work) => {
    if (filter.name && !work.name.toLowerCase().includes(filter.name.toLowerCase())) {
      return false
    }

    if (filter.brand && filter.brand.length > 0) {
      if (!work.brands.some((brand) => filter.brand?.includes(brand.id))) {
        return false
      }
    }

    if (filter.qualification && filter.qualification.length > 0) {
      if (!filter.qualification.includes(work.qualification.id)) {
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

export const sortWorkshopWorks = (data: GetWorkshopWorksQuery, sort?: SortInput): GetWorkshopWorksQuery => {
  if (!sort) return data

  const sortedWorks = [...data.getWorkshopWorks.works].sort((a, b) => {
    let comparison = 0

    switch (sort.field) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'qualification':
        comparison = a.qualification.name.localeCompare(b.qualification.name)
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

    return sort.direction === SortDirection.Desc ? -comparison : comparison
  })

  return {
    getWorkshopWorks: {
      works: sortedWorks,
      metadata: {
        ...data.getWorkshopWorks.metadata,
        sort: {
          field: sort.field,
          direction: sort.direction,
        },
      },
    },
  }
}

export const GET_WORKSHOP_WORK_DEFAULT_RESPONSE = {
  id: '1',
  name: 'Suspension and Steering Service',
  isCapacityEditable: true,
  isDescriptionEditable: false,
  isActive: true,
  qualification: {
    id: '1',
    name: 'Brake and Transmission Technicians',
  },
  brands: [
    {
      id: 'brand_1',
      name: 'OPEL',
      timeUnits: 800,
    },
    {
      id: 'brand_2',
      name: 'TOYOTA',
      timeUnits: 700,
    },
    {
      id: 'brand_3',
      name: 'KIA',
      timeUnits: 900,
    },
  ],
}
