import { PermissionType } from '@/shared/api/types.generated'
import { ROUTE_PATHS } from '@/shared/lib'

import { PermissionSet } from './PermissionContext'

export const CommonPermissionsConfig: Record<string, PermissionSet[]> = {
  [ROUTE_PATHS.Work.Root]: [
    { entity: 'work', access: [PermissionType.Read] },
    { entity: 'brand', access: [PermissionType.Read] },
  ],
  [ROUTE_PATHS.Location.Root]: [
    { entity: 'location', access: [PermissionType.Read] },
    { entity: 'brand', access: [PermissionType.Read] },
  ],
  [ROUTE_PATHS.BusinessStatus.Root]: [{ entity: 'businessStatuses', access: [PermissionType.Read] }],
  [ROUTE_PATHS.ColorSetup.Root]: [{ entity: 'colors', access: [PermissionType.Read] }],
  [ROUTE_PATHS.BusinessStatusByLocation.Root]: [
    { entity: 'businessStatuses', access: [PermissionType.Read] },
    { entity: 'locationStatus', access: [PermissionType.Read] },
    { entity: 'overbooking', access: [PermissionType.Read, PermissionType.Write] },
  ],
  [ROUTE_PATHS.CounterConfiguration.Root]: [
    { entity: 'employee', access: [PermissionType.Read] },
    { entity: 'absence', access: [PermissionType.Read, PermissionType.Write] },
  ],
  [ROUTE_PATHS.LocationServiceAdvisor.Root]: [{ entity: 'employee', access: [PermissionType.Read] }],
}
