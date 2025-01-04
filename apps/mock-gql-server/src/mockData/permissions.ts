export type MockedGqlPermissions = {
  id: string
  name: string
  access: ('read' | 'write')[]
}[]

export const permissions: MockedGqlPermissions = [
  {
    id: 'brand-id',
    name: 'brand',
    access: ['read'],
  },
  {
    id: 'location-id',
    name: 'location',
    access: ['read', 'write'],
  },
  {
    id: 'location-workshop-id',
    name: 'locationWorkshop',
    access: ['read', 'write'],
  },
  {
    id: 'area-id',
    name: 'area',
    access: ['read'],
  },
  {
    id: 'user-id',
    name: 'user',
    access: ['read'],
  },
  {
    id: 'user-location-id',
    name: 'userLocation',
    access: ['read', 'write'],
  },
  {
    id: 'own-user-acl-id',
    name: 'ownUserAcl',
    access: ['read'],
  },
  {
    id: 'users-roles-id',
    name: 'usersRoles',
    access: ['read', 'write'],
  },
  {
    id: 'customer-id',
    name: 'customer',
    access: ['read', 'write'],
  },
  {
    id: 'vehicle-id',
    name: 'vehicle',
    access: ['read', 'write'],
  },
  {
    id: 'employee-id',
    name: 'employee',
    access: ['read', 'write'],
  },
  {
    id: 'absence-id',
    name: 'absence',
    access: ['read', 'write'],
  },
  {
    id: 'division-id',
    name: 'division',
    access: ['read'],
  },
  {
    id: 'colors-id',
    name: 'colors',
    access: ['read', 'write'],
  },
  {
    id: 'overbooking-id',
    name: 'overbooking',
    access: ['read', 'write'],
  },
  {
    id: 'minimal-overbooking-id',
    name: 'minimalOverbooking',
    access: ['read', 'write'],
  },
  {
    id: 'business-statuses-id',
    name: 'businessStatuses',
    access: ['read', 'write'],
  },
  {
    id: 'location-status-id',
    name: 'locationStatus',
    access: ['read', 'write'],
  },
  {
    id: 'appointment-id',
    name: 'appointment',
    access: ['read', 'write'],
  },
  {
    id: 'alerting-id',
    name: 'alerting',
    access: ['read', 'write'],
  },
  {
    id: 'work-id',
    name: 'work',
    access: ['read', 'write'],
  },
]
