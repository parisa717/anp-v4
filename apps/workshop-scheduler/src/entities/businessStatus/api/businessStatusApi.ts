import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformBusinessStatuses, transformBusinessStatusesByLocation } from '../lib/transformBusinessStatus'
import { BusinessStatusEntity } from '../model/types'
import {
  ActivateBusinessStatusMutation,
  api,
  AssignBusinessStatusesToLocationMutation,
  CreateBusinessStatusesMutation,
  DeactivateBusinessStatusMutation,
  EditBusinessStatusMutation,
  GetBusinessStatusesByLocationQuery,
  GetBusinessStatusesQuery,
  GetBusinessStatusQuery,
  ReorderBusinessStatusesMutation,
  UnassignBusinessStatusFromLocationMutation,
} from './BusinessStatus.generated'

type BusinessStatusApi = ApiWithTransformResponse<
  typeof api,
  [
    'GetBusinessStatuses',
    'GetBusinessStatus',
    'CreateBusinessStatuses',
    'GetBusinessStatusesByLocation',
    'EditBusinessStatus',
    'ActivateBusinessStatus',
    'DeactivateBusinessStatus',
    'AssignBusinessStatusesToLocation',
    'UnassignBusinessStatusFromLocation',
    'ReorderBusinessStatuses',
  ],
  {
    GetBusinessStatuses: BusinessStatusEntity[]
    GetBusinessStatus: BusinessStatusEntity
    GetBusinessStatusesByLocation: BusinessStatusEntity[]
    EditBusinessStatus: EditBusinessStatusMutation
    CreateBusinessStatuses: CreateBusinessStatusesMutation
    ActivateBusinessStatus: ActivateBusinessStatusMutation
    DeactivateBusinessStatus: DeactivateBusinessStatusMutation
    AssignBusinessStatusesToLocation: AssignBusinessStatusesToLocationMutation
    UnassignBusinessStatusFromLocation: UnassignBusinessStatusFromLocationMutation
    ReorderBusinessStatuses: ReorderBusinessStatusesMutation
  }
>
type TagTypes = BusinessStatusApi['TagTypes']
type ApiEndpointDefinitions = BusinessStatusApi['ApiEndpointDefinitions']

const BUSINESS_STATUS_TAG = 'BUSINESS_STATUS'
const BUSINESS_STATUS_BY_LOCATION_TAG = 'BUSINESS_STATUS_BY_LOCATION'

export const businessStatusApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, BUSINESS_STATUS_TAG, BUSINESS_STATUS_BY_LOCATION_TAG],
  endpoints: {
    GetBusinessStatuses: {
      transformResponse: (response: GetBusinessStatusesQuery) =>
        transformBusinessStatuses(response.getWorkshopAppointmentBusinessStatuses),
      providesTags: cacher.providesList(BUSINESS_STATUS_TAG),
    },
    GetBusinessStatus: {
      transformResponse: (response: GetBusinessStatusQuery) => response.getWorkshopAppointmentBusinessStatus,
      providesTags: cacher.cacheByIdArgProperty(BUSINESS_STATUS_TAG),
    },
    GetBusinessStatusesByLocation: {
      transformResponse: (response: GetBusinessStatusesByLocationQuery) =>
        transformBusinessStatusesByLocation(response.getLocationWorkshopAppointmentBusinessStatuses),
      providesTags: cacher.cacheByIdArgProperty(BUSINESS_STATUS_BY_LOCATION_TAG),
    },
    CreateBusinessStatuses: {
      invalidatesTags: cacher.invalidatesList(BUSINESS_STATUS_TAG),
    },
    EditBusinessStatus: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArgProperty(BUSINESS_STATUS_TAG)(result, error, arg.businessStatus),
    },
    ActivateBusinessStatus: {
      invalidatesTags: cacher.cacheByIdArgProperty(BUSINESS_STATUS_TAG),
    },
    DeactivateBusinessStatus: {
      invalidatesTags: (result, error, arg) => [
        ...cacher.cacheByIdArgProperty(BUSINESS_STATUS_TAG)(result, error, arg),
        ...(arg.defaultBusinessStatusId
          ? cacher.cacheByIdArg(BUSINESS_STATUS_TAG)(result, error, arg.defaultBusinessStatusId)
          : []),
      ],
    },
    AssignBusinessStatusesToLocation: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(BUSINESS_STATUS_BY_LOCATION_TAG)(result, error, arg.locationId),
    },
    UnassignBusinessStatusFromLocation: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(BUSINESS_STATUS_BY_LOCATION_TAG)(result, error, arg.locationId),
    },
    ReorderBusinessStatuses: {
      invalidatesTags: cacher.invalidatesList(BUSINESS_STATUS_TAG),
    },
  },
})

export const {
  useGetBusinessStatusesQuery,
  useCreateBusinessStatusesMutation,
  useGetBusinessStatusesByLocationQuery,
  useEditBusinessStatusMutation,
  useGetBusinessStatusQuery,
  useAssignBusinessStatusesToLocationMutation,
  useUnassignBusinessStatusFromLocationMutation,
  useActivateBusinessStatusMutation,
  useDeactivateBusinessStatusMutation,
  useReorderBusinessStatusesMutation,
} = businessStatusApi
