import { QueryAdditionalBusinessStatuses } from '../api/types'
import { AdditionalBusinessStatusEntity } from '../model/types'

const filterAdditionalBusinessStatuses = (
  additionalBusinessStatus: AdditionalBusinessStatusEntity | null,
): additionalBusinessStatus is AdditionalBusinessStatusEntity => additionalBusinessStatus !== null

export const transformAdditionalBusinessStatuses = (additionalBusinessStatuses: QueryAdditionalBusinessStatuses) => {
  return additionalBusinessStatuses?.additionalBusinessStatuses.filter(filterAdditionalBusinessStatuses) ?? []
}
