import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { VehicleEntity } from '../model/types'
import { api, GetVehicleQuery } from './Vehicle.generated'

type VehicleApi = ApiWithTransformResponse<
  typeof api,
  ['GetVehicle'],
  {
    GetVehicle: VehicleEntity
  }
>
type TagTypes = VehicleApi['TagTypes']
type ApiEndpointDefinitions = VehicleApi['ApiEndpointDefinitions']

const VEHICLE_TAG = 'VEHICLE'

export const vehicleApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, VEHICLE_TAG],
  endpoints: {
    GetVehicle: {
      transformResponse: (response: GetVehicleQuery) => response.getVehicle,
      providesTags: cacher.cacheByIdArgProperty(VEHICLE_TAG),
    },
  },
})

export const { useGetVehicleQuery } = vehicleApi
