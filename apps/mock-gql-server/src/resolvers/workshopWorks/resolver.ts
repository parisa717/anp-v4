import { workshopWork, workshopWorks } from '../../mockData'
import { PaginationInput, SortInput } from '../types'
import { WorkshopWorksFilterInput } from './types'
import { filterWorks, paginateWorks, sortWorks } from './utils'

export const workshopWorksResolver = {
  getWorkshopWorks: (
    _: unknown,
    {
      filter,
      pagination,
      sort,
    }: {
      filter?: WorkshopWorksFilterInput
      pagination?: PaginationInput
      sort?: SortInput
    },
  ) => {
    const filteredWorks = filterWorks(workshopWorks, filter)
    const sortedWorks = sortWorks(filteredWorks, sort)
    const { works: paginatedWorks, totalResults } = paginateWorks(sortedWorks, pagination)

    return {
      works: paginatedWorks,
      metadata: {
        totalResults,
        sort: {
          field: sort?.field ?? null,
          direction: sort?.direction ?? null,
        },
      },
    }
  },
  getWorkshopWork: (_: unknown) => {
    return workshopWork
  },
}
