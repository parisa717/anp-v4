import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformAdditionalBusinessStatuses } from '../lib/transformAdditionalBusinessStatus'
import { AdditionalBusinessStatusEntity } from '../model/types'
import {
  ActivateAdditionalBusinessStatusMutation,
  api,
  AssignAdditionalBusinessStatusesToLocationMutation,
  CreateAdditionalBusinessStatusesMutation,
  DeactivateAdditionalBusinessStatusMutation,
  EditAdditionalBusinessStatusMutation,
  GetAdditionalBusinessStatusesByLocationQuery,
  GetAdditionalBusinessStatusesQuery,
  GetAdditionalBusinessStatusQuery,
  UnassignAdditionalBusinessStatusFromLocationMutation,
} from './AdditionalBusinessStatus.generated'

type AdditionalBusinessStatusApi = ApiWithTransformResponse<
  typeof api,
  [
    'GetAdditionalBusinessStatuses',
    'CreateAdditionalBusinessStatuses',
    'GetAdditionalBusinessStatus',
    'EditAdditionalBusinessStatus',
    'ActivateAdditionalBusinessStatus',
    'DeactivateAdditionalBusinessStatus',
    'GetAdditionalBusinessStatusesByLocation',
    'AssignAdditionalBusinessStatusesToLocation',
    'UnassignAdditionalBusinessStatusFromLocation',
  ],
  {
    GetAdditionalBusinessStatuses: AdditionalBusinessStatusEntity[]
    GetAdditionalBusinessStatus: AdditionalBusinessStatusEntity
    CreateAdditionalBusinessStatuses: CreateAdditionalBusinessStatusesMutation
    EditAdditionalBusinessStatus: EditAdditionalBusinessStatusMutation
    ActivateAdditionalBusinessStatus: ActivateAdditionalBusinessStatusMutation
    DeactivateAdditionalBusinessStatus: DeactivateAdditionalBusinessStatusMutation
    GetAdditionalBusinessStatusesByLocation: AdditionalBusinessStatusEntity[]
    AssignAdditionalBusinessStatusesToLocation: AssignAdditionalBusinessStatusesToLocationMutation
    UnassignAdditionalBusinessStatusFromLocation: UnassignAdditionalBusinessStatusFromLocationMutation
  }
>
type TagTypes = AdditionalBusinessStatusApi['TagTypes']
type ApiEndpointDefinitions = AdditionalBusinessStatusApi['ApiEndpointDefinitions']

const ADDITIONAL_BUSINESS_STATUS_TAG = 'ADDITIONAL_BUSINESS_STATUS'
const ADDITIONAL_BUSINESS_STATUS_BY_LOCATION_TAG = 'ADDITIONAL_BUSINESS_STATUS_BY_LOCATION'

export const additionalBusinessStatusApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, ADDITIONAL_BUSINESS_STATUS_TAG, ADDITIONAL_BUSINESS_STATUS_BY_LOCATION_TAG],
  endpoints: {
    GetAdditionalBusinessStatuses: {
      transformResponse: (response: GetAdditionalBusinessStatusesQuery) =>
        transformAdditionalBusinessStatuses(response.getWorkshopAppointmentAdditionalBusinessStatuses),
      providesTags: cacher.providesList(ADDITIONAL_BUSINESS_STATUS_TAG),
    },
    GetAdditionalBusinessStatus: {
      transformResponse: (response: GetAdditionalBusinessStatusQuery) =>
        response.getWorkshopAppointmentAdditionalBusinessStatus,
      providesTags: cacher.cacheByIdArgProperty(ADDITIONAL_BUSINESS_STATUS_TAG),
    },
    CreateAdditionalBusinessStatuses: {
      invalidatesTags: cacher.invalidatesList(ADDITIONAL_BUSINESS_STATUS_TAG),
    },
    EditAdditionalBusinessStatus: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArgProperty(ADDITIONAL_BUSINESS_STATUS_TAG)(result, error, arg.additionalBusinessStatus),
    },
    ActivateAdditionalBusinessStatus: {
      invalidatesTags: cacher.cacheByIdArgProperty(ADDITIONAL_BUSINESS_STATUS_TAG),
    },
    DeactivateAdditionalBusinessStatus: {
      invalidatesTags: (result, error, arg) => [
        ...cacher.cacheByIdArgProperty(ADDITIONAL_BUSINESS_STATUS_TAG)(result, error, arg),
        ...(arg.defaultAdditionalBusinessStatusId
          ? cacher.cacheByIdArg(ADDITIONAL_BUSINESS_STATUS_TAG)(result, error, arg.defaultAdditionalBusinessStatusId)
          : []),
      ],
    },
    GetAdditionalBusinessStatusesByLocation: {
      transformResponse: (response: GetAdditionalBusinessStatusesByLocationQuery) =>
        transformAdditionalBusinessStatuses(response.getLocationWorkshopAppointmentAdditionalBusinessStatuses),
      providesTags: cacher.cacheByIdArgProperty(ADDITIONAL_BUSINESS_STATUS_BY_LOCATION_TAG),
    },
    AssignAdditionalBusinessStatusesToLocation: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(ADDITIONAL_BUSINESS_STATUS_BY_LOCATION_TAG)(result, error, arg.locationId),
    },
    UnassignAdditionalBusinessStatusFromLocation: {
      invalidatesTags: (result, error, arg) =>
        cacher.cacheByIdArg(ADDITIONAL_BUSINESS_STATUS_BY_LOCATION_TAG)(result, error, arg.locationId),
    },
  },
})

export const {
  useGetAdditionalBusinessStatusesQuery,
  useGetAdditionalBusinessStatusQuery,
  useGetAdditionalBusinessStatusesByLocationQuery,
  useCreateAdditionalBusinessStatusesMutation,
  useEditAdditionalBusinessStatusMutation,
  useActivateAdditionalBusinessStatusMutation,
  useDeactivateAdditionalBusinessStatusMutation,
  useAssignAdditionalBusinessStatusesToLocationMutation,
  useUnassignAdditionalBusinessStatusFromLocationMutation,
} = additionalBusinessStatusApi
