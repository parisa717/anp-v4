import { cacher } from '@nexus-ui/utils'
import { type ApiWithTransformResponse } from '@nexus-ui/utils'

import { PermissionEntity } from '../model/types'
import { api, GetUserPermissionsQuery } from './Permission.generated'

type PermissionApi = ApiWithTransformResponse<
  typeof api,
  ['GetUserPermissions'],
  {
    GetUserPermissions: PermissionEntity[]
  }
>
type TagTypes = PermissionApi['TagTypes']
type ApiEndpointDefinitions = PermissionApi['ApiEndpointDefinitions']

const PERMISSION_TAG = 'PERMISSION'

export const permissionApi = api.enhanceEndpoints<TagTypes, ApiEndpointDefinitions>({
  addTagTypes: [...cacher.defaultTags, PERMISSION_TAG],
  endpoints: {
    GetUserPermissions: {
      transformResponse: (response: GetUserPermissionsQuery) => response.getUserPermissions.permissions,
      providesTags: cacher.providesList(PERMISSION_TAG),
    },
  },
})

export const { useGetUserPermissionsQuery } = permissionApi
