import { QueryBusinessStatuses, QueryBusinessStatusesByLocation } from '../api/types'
import { type BusinessStatusEntity } from '../model/types'

const filterBusinessStatuses = (businessStatus: BusinessStatusEntity | null): businessStatus is BusinessStatusEntity =>
  businessStatus !== null

export const transformBusinessStatuses = (businessStatuses: QueryBusinessStatuses) => {
  return businessStatuses?.businessStatuses.filter(filterBusinessStatuses) ?? []
}

export const transformBusinessStatusesByLocation = (businessStatuses: QueryBusinessStatusesByLocation) => {
  return businessStatuses?.businessStatuses.filter(filterBusinessStatuses) ?? []
}
