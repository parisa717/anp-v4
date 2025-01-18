import { useTranslation } from '@nexus-ui/i18n'
import { ProfileButton, Sidebar, Topbar } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Menu } from 'primereact/menu'
import { ReactNode } from 'react'
import { Outlet } from 'react-router'

import { useMenuItems } from '../lib/useMenuItems'
import { useSetCurrentLocation } from '../lib/useSetCurrentLocation'

type BaseLayoutProps = {
  children?: ReactNode
}

const USER_FULL_NAME = 'John Doe'
const IS_LOGGED_IN = true

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { t } = useTranslation()

  const menuItems = useMenuItems()

  useSetCurrentLocation()

  return (
    <div className="flex flex-col h-screen bg-bluegray-50 p-2">
      <div className="mb-2">
        <Topbar
          title={t('widgets.baseLayout.topbar.title')}
          right={
            <>
              {children}
              <Divider layout="vertical" className="p-0" />
              {<ProfileButton fullName={USER_FULL_NAME} />}
              {IS_LOGGED_IN && (
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
