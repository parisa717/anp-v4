import { ProfileButton, Sidebar, Topbar } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Menu } from 'primereact/menu'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

import { useMenuItems } from '../lib/useMenuItems'

//TODO: Use proper data after login system will be implemented
export const BaseLayout = () => {
  const isLoading = false
  const currentUserFullName = 'John Doe'
  const isLoggedIn = true
  const menuItems = useMenuItems()
  const { t } = useTranslation()

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div className="flex flex-col h-screen bg-bluegray-50 p-2">
      <div className="mb-2">
        <Topbar
          title="Admin Portal"
          right={
            <>
              {currentUserFullName && <ProfileButton fullName={currentUserFullName} />}
              {isLoggedIn && (
                <>
                  <Divider layout="vertical" className="p-0" />
                  <Button icon="pi pi-sign-out" text aria-label={t('sign out')} data-cy="sign-out-button" />
                </>
              )}
            </>
          }
        />
      </div>

      <div className="flex grow overflow-auto">
        <nav data-cy="layout-menu" className="flex-shrink-0">
          <Sidebar className="h-full">
            <Menu model={menuItems} />
          </Sidebar>
        </nav>

        <div className="flex-grow overflow-auto pl-28 pr-40 pt-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
