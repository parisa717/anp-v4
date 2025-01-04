import { useTranslation } from '@nexus-ui/i18n'
import clsx from 'clsx'
import { Button } from 'primereact/button'
import { ButtonGroup } from 'primereact/buttongroup'
import { SelectButton, SelectButtonChangeEvent, SelectButtonPassThroughMethodOptions } from 'primereact/selectbutton'
import { ToolbarProps, View } from 'react-big-calendar'

type Props = ToolbarProps & {
  view: View
  headerText: string
}

export const Toolbar = ({ view, headerText, onNavigate, onView }: Props) => {
  const { t } = useTranslation()

  const viewSelectorItems: { name: string; value: View }[] = [
    { name: t('calendar.month'), value: 'month' },
    { name: t('calendar.week'), value: 'week' },
    { name: t('calendar.day'), value: 'day' },
  ]

  const handleChangeView = (e: SelectButtonChangeEvent) => {
    if (e.value) {
      onView(e.value)
    }
  }

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <ButtonGroup>
          <Button icon="pi pi-angle-left" onClick={() => onNavigate('PREV')} className="bg-teal-700" />
          <Button icon="pi pi-angle-right" onClick={() => onNavigate('NEXT')} className="bg-teal-700" />
        </ButtonGroup>
        <Button label={t('calendar.today')} onClick={() => onNavigate('TODAY')} className="bg-teal-700" />
      </div>
      <p className="text-fullcalendar-title font-fullcalendar-title leading-fullcalendar-title text-shade-700">
        {headerText}
      </p>
      <SelectButton
        value={view}
        onChange={handleChangeView}
        optionLabel="name"
        options={viewSelectorItems}
        pt={{
          button: ({ context }: SelectButtonPassThroughMethodOptions) => ({
            className: clsx(context.selected && 'bg-teal-700'),
          }),
        }}
      />
    </div>
  )
}
