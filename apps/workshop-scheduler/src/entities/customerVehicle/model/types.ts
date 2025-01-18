import {
  GqlGetCustomerVehiclesCustomerVehiclesObjectType,
  GqlGetCustomerVehiclesObjectType,
} from '@/shared/api/types.generated'

export type CustomerVehicleEntity = GqlGetCustomerVehiclesObjectType['customerVehicles'][number]
export type CustomerVehicleDetailsEntity = GqlGetCustomerVehiclesCustomerVehiclesObjectType['vehicles'][number]
