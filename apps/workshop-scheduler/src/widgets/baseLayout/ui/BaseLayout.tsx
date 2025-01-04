import { Layout } from '@/shared/ui'

import { useMenuItems } from '../lib/useMenuItems'
import { useSetCurrentLocation } from '../lib/useSetCurrentLocation'

export const BaseLayout = () => {
  const menuItems = useMenuItems()

  useSetCurrentLocation()

  return <Layout menuItems={menuItems} userFullName="John Doe" isLoggedIn={true} /> //TODO: Use proper data after login system will be implemented
}
