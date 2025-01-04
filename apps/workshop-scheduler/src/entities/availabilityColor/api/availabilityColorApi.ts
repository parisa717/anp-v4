import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { transformAvailabilityColors } from '../lib/transformAvailabilityColor'
import { AvailabilityColorEntity } from '../model/types'
import { api, GetAvailabilityColorsQuery, UpdateAvailabilityColorsMutation } from './AvailabilityColor.generated'

type AvailabilityColorApi = ApiWithTransformResponse<
  typeof api,
  ['GetAvailabilityColors', 'UpdateAvailabilityColors'],
  {
    GetAvailabilityColors: AvailabilityColorEntity[]
    UpdateAvailabilityColors: UpdateAvailabilityColorsMutation
  }
>
type TagTypes = AvailabilityColorApi['TagTypes']
type ApiEndpointDefinitions = AvailabilityColorApi['ApiEndpointDefinitions']

const AVAILABILITY_COLOR_TAG = 'AVAILABILITY_COLOR'

export const availabilityColorApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, AVAILABILITY_COLOR_TAG],
  endpoints: {
    GetAvailabilityColors: {
      transformResponse: (response: GetAvailabilityColorsQuery) =>
        transformAvailabilityColors(response.getAvailabilityColors),
      providesTags: cacher.providesList(AVAILABILITY_COLOR_TAG),
    },
    UpdateAvailabilityColors: {
      invalidatesTags: cacher.invalidatesList(AVAILABILITY_COLOR_TAG),
    },
  },
})

export const { useGetAvailabilityColorsQuery, useUpdateAvailabilityColorsMutation } = availabilityColorApi
