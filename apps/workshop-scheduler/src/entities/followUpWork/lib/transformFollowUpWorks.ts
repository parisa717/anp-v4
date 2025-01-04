import { QueryFollowUpWorks } from '../api/types'
import { type FollowUpWorkEntity } from '../model/types'

const filterWorks = (work: FollowUpWorkEntity | null): work is FollowUpWorkEntity => work !== null

export const transformWorks = (works: QueryFollowUpWorks) => {
  return works?.works.filter(filterWorks) ?? []
}
