import { GqlGetCustomerObjectType } from '@/shared/api/types.generated'

export type CustomerEntity = GqlGetCustomerObjectType

export enum ContactType {
  PRIVATE = 'PRIVATE',
  BUSINESS = 'BUSINESS',
}

export enum DeviceType {
  MOBILE = 'MOBILE',
  HOME = 'HOME',
}
