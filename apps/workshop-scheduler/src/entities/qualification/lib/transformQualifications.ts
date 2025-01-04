import { QueryQualifications } from '../api/types'
import { type QualificationEntity } from '../model/types'

const filterQualifications = (qualification: QualificationEntity | null): qualification is QualificationEntity =>
  qualification !== null

export const transformQualifications = (qualifications: QueryQualifications) => {
  return qualifications?.qualifications.filter(filterQualifications) ?? []
}
