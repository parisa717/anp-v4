import { useTranslation } from '@nexus-ui/i18n'
import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from 'primereact/menu'

import { Sidebar, SidebarProps } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
}

export default meta

type Story = StoryObj<typeof Sidebar>

const DefaultStoryComponent = (args: SidebarProps) => {
  const { t } = useTranslation()

  return (
    <Sidebar className="h-[500px]" {...args}>
      <Menu
        model={[
          {
            label: t('main menu'),
            items: [
              {
                label: t('dashboard'),
                icon: 'pi pi-th-large',
              },
              {
                label: t('dates'),
                icon: 'pi pi-list',
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: t('settings'),
            items: [
              {
                label: t('scheduled work'),
                icon: 'pi pi-wrench',
              },
              {
                label: `${t('status')}/${t('overbooking')}`,
                icon: 'pi pi-bookmark',
              },
              {
                label: `${t('service advisor')}-${t('calendar')}`,
                icon: 'pi pi-calendar',
              },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}

export const Default: Story = {
  render: DefaultStoryComponent,
}
