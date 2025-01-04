import { GqlBusinessStatusObjectType } from '@/shared/api/types.generated'

export type BusinessStatusEntity = Omit<GqlBusinessStatusObjectType, '__typename'>
