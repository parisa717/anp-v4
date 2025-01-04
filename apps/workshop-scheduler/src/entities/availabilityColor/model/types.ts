import { GqlAvailabilityColorObjectType } from '@/shared/api/types.generated'

type AvailabilityColorAdditionalProps = {
  capacityValue: string
}

export type AvailabilityColorEntity = GqlAvailabilityColorObjectType & AvailabilityColorAdditionalProps
