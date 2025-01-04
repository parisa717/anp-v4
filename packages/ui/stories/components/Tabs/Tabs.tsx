import clsx from 'clsx'
import merge from 'lodash/merge'
import { TabPanel, TabPanelPassThroughOptions, TabPanelProps, TabView, TabViewProps } from 'primereact/tabview'

interface HeaderActionProps {
  context: {
    index: number
  }
  parent: {
    props: TabViewProps & {
      activeIndex: number
    }
  }
}

const defaultTabPanelPt = {
  headerAction: (props: HeaderActionProps) => {
    const isActive = props.context.index === props.parent.props.activeIndex

    return {
      className: clsx(
        'text-tabview-header-typography bg-[transparent]',
        isActive
          ? 'text-tabview-header-active-color border-theme-primary'
          : 'text-tabview-header-color border-global-shade-300',
      ),
    }
  },
}

const defaultTabViewPt = {
  root: { className: 'mt-5 mb-6' },
  nav: { className: 'bg-[transparent]' },
  panelContainer: { className: 'bg-[transparent] px-0 pt-6' },
}

interface TabsProps extends TabViewProps {
  items: Array<TabPanelProps & { id: string }>
  tabPanelPt?: TabPanelPassThroughOptions
}

export const Tabs = ({ items, pt: customTabViewPt = {}, tabPanelPt: customGlobalTabPanelPt, ...rest }: TabsProps) => {
  return (
    <TabView pt={merge(defaultTabViewPt, customTabViewPt)} {...rest}>
      {items.map(({ id, pt: customLocalTabPanelPt, ...tabProps }) => (
        <TabPanel key={id} pt={merge(defaultTabPanelPt, customGlobalTabPanelPt, customLocalTabPanelPt)} {...tabProps} />
      ))}
    </TabView>
  )
}
