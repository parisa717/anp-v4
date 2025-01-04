import { TFunction } from 'i18next'
import { MenuItem } from 'primereact/menuitem'

import { CommonPermissionsConfig, PermissionSet } from '@/entities/permission'
import { pageUrls, ROUTE_PATHS } from '@/shared/lib'

export const getNavigationMenuConfig = (t: TFunction, hasPermissions: (permissionsSet: PermissionSet[]) => boolean) => {
  return [
    {
      label: t('widgets.baseLayout.menuItems.mainMenu'),
      items: [
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.Work.Root]) && {
          label: t('widgets.baseLayout.menuItems.workToBeCarriedOut'),
          icon: 'pi pi-wrench',
          url: pageUrls.work.root(),
        },
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.Location.Root]) && {
          label: t('widgets.baseLayout.menuItems.locationConfiguration'),
          icon: 'pi pi-map-marker',
          url: pageUrls.location.root(),
        },
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.BusinessStatus.Root]) && {
          label: t('widgets.baseLayout.menuItems.status'),
          icon: 'pi pi-bookmark',
          url: pageUrls.businessStatus.root(),
        },
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.ColorSetup.Root]) && {
          label: t('widgets.baseLayout.menuItems.colorSetup'),
          icon: 'pi pi-palette',
          url: pageUrls.colorSetup.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.userConfiguration'),
          icon: 'pi pi-user',
          url: pageUrls.colorSetup.root(),
        },
        {
          label: t('widgets.baseLayout.menuItems.setupAlarmFunctionDepotList'),
          icon: 'pi pi-bell',
          url: pageUrls.colorSetup.root(),
        },
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.BusinessStatusByLocation.Root]) && {
          label: t('widgets.baseLayout.menuItems.statusAndOverbookingConfiguration'),
          icon: 'pi pi-bookmark',
          url: pageUrls.businessStatusByLocation.root(),
        },
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.CounterConfiguration.Root]) && {
          label: t('widgets.baseLayout.menuItems.counterConfiguration'),
          icon: 'pi pi-clock',
          url: pageUrls.counterConfiguration.root(),
        },
        hasPermissions(CommonPermissionsConfig[ROUTE_PATHS.LocationServiceAdvisor.Root]) && {
          label: t('widgets.baseLayout.menuItems.serviceAdvisorConfiguration'),
          icon: 'pi pi-calendar',
          url: pageUrls.locationServiceAdvisor.root(),
        },
        //TODO: Remove this entry when there are other pages with the calendar being used
        {
          label: 'Calendar example',
          icon: 'pi pi-calendar',
          url: '/calendar',
        },
      ].reduce<MenuItem[]>((acc, item) => {
        if (item) acc.push(item)
        return acc
      }, []),
    },
  ]
}
