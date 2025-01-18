export const ROUTE_PATHS = {
  Root: '/',
  BusinessStatus: {
    Root: '/business-status',
    Create: '/business-status/create',
    Edit: '/business-status/:id/edit',
    CreateAdditional: '/business-status/create-additional',
    EditAdditional: '/business-status/:id/edit-additional',
    UnselectDefault: '/business-status/:id/unselect-default',
    UnselectDefaultAdditional: '/business-status/:id/unselect-default-additional',
    ChangeStatusConfirmation: '/business-status/:id/change-status-confirmation',
  },
  CounterConfiguration: {
    Root: '/counter-configurator',
  },
  TeamsCapacity: {
    Root: '/teams-capacity',
  },
  Location: {
    Root: '/location',
    Details: {
      Root: '/location/:id/details',
      LocationWorks: {
        Create: `/location/:id/details/services/create`,
        Edit: `/location/:id/details/services/edit/:locationWorkId`,
        Remove: `/location/:id/details/services/remove/:locationWorkId`,
      },
    },
  },
  BusinessStatusByLocation: {
    Root: '/business-status-by-location',
    Create: '/business-status-by-location/create',
    CreateAdditional: '/business-status-by-location/create-additional',
  },
  ColorSetup: {
    Root: '/color-setup',
    Edit: '/color-setup/edit',
  },
  FollowUpWork: {
    Root: '/work?tab=follow-up',
    Add: '/work/add-followup-work',
    Edit: '/work/:id/edit-followup-work',
  },
  Work: {
    Root: '/work',
    Add: '/work/add',
    Edit: '/work/:id/edit',
    DeactivateService: '/work/:id/deactivate-service',
    ActivateService: '/work/:id/activate-service',
  },
  LocationServiceAdvisor: {
    Root: '/service-advisor',
    Details: '/service-advisor/:id',
  },
} as const
