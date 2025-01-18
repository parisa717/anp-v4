import { GetUserPermissionsQuery } from '@/entities/permission/api/Permission.generated'
import { PermissionType } from '@/shared/api/types.generated'

export const GET_USER_PERMISSIONS_RESPONSE: GetUserPermissionsQuery = {
  getUserPermissions: {
    permissions: [
      {
        id: 'brand-id',
        name: 'brand',
        access: [PermissionType.Read],
      },
      {
        id: 'location-id',
        name: 'location',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'location-workshop-id',
        name: 'locationWorkshop',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'area-id',
        name: 'area',
        access: [PermissionType.Read],
      },
      {
        id: 'user-id',
        name: 'user',
        access: [PermissionType.Read],
      },
      {
        id: 'user-location-id',
        name: 'userLocation',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'own-user-acl-id',
        name: 'ownUserAcl',
        access: [PermissionType.Read],
      },
      {
        id: 'users-roles-id',
        name: 'usersRoles',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'customer-id',
        name: 'customer',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'vehicle-id',
        name: 'vehicle',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'employee-id',
        name: 'employee',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'absence-id',
        name: 'absence',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'division-id',
        name: 'division',
        access: [PermissionType.Read],
      },
      {
        id: 'colors-id',
        name: 'colors',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'overbooking-id',
        name: 'overbooking',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'minimal-overbooking-id',
        name: 'minimalOverbooking',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'business-statuses-id',
        name: 'businessStatuses',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'location-status-id',
        name: 'locationStatus',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'appointment-id',
        name: 'appointment',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'alerting-id',
        name: 'alerting',
        access: [PermissionType.Read, PermissionType.Write],
      },
      {
        id: 'work-id',
        name: 'work',
        access: [PermissionType.Read, PermissionType.Write],
      },
    ],
  },
}
