import { GqlGetAvailabilityColorObjectType } from '@/shared/api/types.generated'

type AvailabilityColorAdditionalProps = {
  capacityValue: string
}

export type AvailabilityColorEntity = GqlGetAvailabilityColorObjectType & AvailabilityColorAdditionalProps
