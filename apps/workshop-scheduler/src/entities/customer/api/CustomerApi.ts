import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { CustomerEntity } from '../model/types'
import { api, GetCustomerQuery } from './Customer.generated'

type CustomerApi = ApiWithTransformResponse<
  typeof api,
  ['GetCustomer'],
  {
    GetCustomer: CustomerEntity
  }
>
type TagTypes = CustomerApi['TagTypes']
type ApiEndpointDefinitions = CustomerApi['ApiEndpointDefinitions']

const CUSTOMER_TAG = 'CUSTOMER'

export const customerApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, CUSTOMER_TAG],
  endpoints: {
    GetCustomer: {
      transformResponse: (response: GetCustomerQuery) => response.getCustomer,
      providesTags: cacher.cacheByIdArgProperty(CUSTOMER_TAG),
    },
  },
})

export const { useGetCustomerQuery } = customerApi
