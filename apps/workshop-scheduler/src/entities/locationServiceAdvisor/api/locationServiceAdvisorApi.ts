import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { ServiceAdvisorCalendar, ServiceAdvisorEntity } from '../model'
import {
  api,
  GetLocationServiceAdvisorsQuery,
  GetServiceAdvisorCalendarQuery,
  GetServiceAdvisorQuery,
  UpdateServiceAdvisorCalendarEntryMutation,
} from './LocationServiceAdvisor.generated'

type LocationServiceAdvisorApi = ApiWithTransformResponse<
  typeof api,
  ['GetLocationServiceAdvisors', 'GetServiceAdvisor', 'GetServiceAdvisorCalendar', 'UpdateServiceAdvisorCalendarEntry'],
  {
    GetLocationServiceAdvisors: ServiceAdvisorEntity[]
    GetServiceAdvisor: ServiceAdvisorEntity
    GetServiceAdvisorCalendar: ServiceAdvisorCalendar
    UpdateServiceAdvisorCalendarEntry: UpdateServiceAdvisorCalendarEntryMutation
  }
>

type TagTypes = LocationServiceAdvisorApi['TagTypes']
type ApiEndpointDefinitions = LocationServiceAdvisorApi['ApiEndpointDefinitions']

const LOCATION_SERVICE_ADVISOR_TAG = 'LOCATION_SERVICE_ADVISOR'

export const locationServiceAdvisorApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, LOCATION_SERVICE_ADVISOR_TAG],
  endpoints: {
    GetLocationServiceAdvisors: {
      transformResponse: (response: GetLocationServiceAdvisorsQuery) =>
        response.getLocationServiceAdvisors.serviceAdvisors,
      providesTags: cacher.providesList(LOCATION_SERVICE_ADVISOR_TAG),
    },
    GetServiceAdvisor: {
      transformResponse: (response: GetServiceAdvisorQuery) => response.getServiceAdvisor,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_SERVICE_ADVISOR_TAG),
    },
    GetServiceAdvisorCalendar: {
      transformResponse: (response: GetServiceAdvisorCalendarQuery) => response.getServiceAdvisorCalendar,
      providesTags: cacher.cacheByIdArgProperty(LOCATION_SERVICE_ADVISOR_TAG),
    },
    UpdateServiceAdvisorCalendarEntry: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(LOCATION_SERVICE_ADVISOR_TAG)(result, error, arg.advisorId),
    },
  },
})

export const {
  useGetLocationServiceAdvisorsQuery,
  useGetServiceAdvisorQuery,
  useGetServiceAdvisorCalendarQuery,
  useUpdateServiceAdvisorCalendarEntryMutation,
} = locationServiceAdvisorApi
