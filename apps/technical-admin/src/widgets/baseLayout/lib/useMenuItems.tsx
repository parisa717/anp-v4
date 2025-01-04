import { useTranslation } from '@nexus-ui/i18n'
import { MenuItem } from 'primereact/menuitem'
import { useNavigate } from 'react-router'

import { getMenuItems } from './getMenuItems'

export const useMenuItems = (): MenuItem[] => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const processMenuItem = (menuItem: MenuItem) => {
    const processedItem = {
      ...menuItem,
      url: undefined,
      command: () => menuItem.url && navigate(menuItem.url),
    }

    if (menuItem.items && Array.isArray(menuItem.items)) {
      processedItem.items = menuItem.items.map(processMenuItem)
    }

    return processedItem
  }

  return getMenuItems(t).map(processMenuItem)
}
