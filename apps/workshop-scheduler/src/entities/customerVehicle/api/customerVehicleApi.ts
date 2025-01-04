import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { CustomerVehicleEntity } from '../model/types'
import { api, GetCustomerVehiclesQuery } from './CustomerVehicle.generated'

type CustomerVehiclesApi = ApiWithTransformResponse<
  typeof api,
  ['GetCustomerVehicles'],
  {
    GetCustomerVehicles: CustomerVehicleEntity[]
  }
>
type TagTypes = CustomerVehiclesApi['TagTypes']
type ApiEndpointDefinitions = CustomerVehiclesApi['ApiEndpointDefinitions']

const CUSTOMER_VEHICLES_WORK_TAG = 'CUSTOMER_VEHICLES'

export const customerVehiclesApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, CUSTOMER_VEHICLES_WORK_TAG],
  endpoints: {
    GetCustomerVehicles: {
      transformResponse: (response: GetCustomerVehiclesQuery) => response.getCustomerVehicles.customerVehicles,
      providesTags: cacher.providesList(CUSTOMER_VEHICLES_WORK_TAG),
    },
  },
})

export const { useGetCustomerVehiclesQuery } = customerVehiclesApi
