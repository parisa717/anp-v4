import { QueryWorks } from '../api/types'
import { type WorkEntity } from '../model/types'

const filterWorks = (work: WorkEntity | null): work is WorkEntity => work !== null

export const transformWorks = (works: QueryWorks) => {
  return works?.works.filter(filterWorks) ?? []
}
