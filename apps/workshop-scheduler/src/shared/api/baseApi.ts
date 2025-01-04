import { createBaseApi, GATEWAY_HEADER_VALUES } from '@nexus-ui/utils'

export const baseApi = createBaseApi({
  gatewayHeaderValue: GATEWAY_HEADER_VALUES.WORKSHOP_SCHEDULER,
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
})
