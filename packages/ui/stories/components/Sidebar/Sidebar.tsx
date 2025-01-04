import { useTranslation } from '@nexus-ui/i18n'
import clsx from 'clsx'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { cloneElement, useState } from 'react'

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement
}

export const Sidebar = ({ children, className }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const { t } = useTranslation()

  return (
    <div
      data-cy="sidebar"
      className={clsx(
        `
        relative
        bg-sidebarmenu
        rounded-sidebarmenu
      `,
        isExpanded
          ? 'w-[208px] pt-sidebarmenu-top pr-sidebarmenu-right pb-sidebarmenu-bottom pl-sidebarmenu-left'
          : 'w-[56px] p-2',
        className,
      )}
    >
      {cloneElement(children, {
        unstyled: true,
        pt: {
          root: {
            className: 'border-0 py-0 w-auto bg-[transparent]',
          },
          menu: {
            className: 'list-none m-0 p-0',
            tabIndex: -1,
          },
          submenuHeader: {
            className: clsx(
              'bg-[transparent] font-sidebarmenu leading-sidebarmenu text-sidebarmenu uppercase p-0 pb-4',
              isExpanded || 'hidden',
            ),
          },
          action: {
            className: clsx(
              `rounded-menuitem
              font-menuitem leading-menuitem text-menuitem hover:text-menuitem-active focus:text-menuitem-active hover:bg-menuitem-active focus:bg-menuitem-active
              pt-menuitem-top pr-menuitem-right pb-menuitem-right pl-menuitem-left
              flex items-center gap-inline
              transition duration-75
              no-underline`,
              isExpanded || 'justify-center',
            ),
            tabIndex: 0,
          },
          label: {
            className: clsx('capitalize', isExpanded || 'hidden'),
          },
          separator: {
            children: <Divider />,
          },
        },
      })}

      <Button
        data-cy="sidebar-button"
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        className="absolute right-0 bottom-4 translate-x-1/2 bg-button"
        icon="pi pi-arrow-right-arrow-left"
        rounded
        aria-label={isExpanded ? t('collapse') : t('expand')}
        aria-expanded={isExpanded}
        aria-controls="sidebar"
      />
    </div>
  )
}
