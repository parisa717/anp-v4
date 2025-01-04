//TODO: Remove this page as soon as there is another page that uses the Calendar component

import './CalendarExample.css'

import { format, getDay, parse, startOfWeek } from 'date-fns'
import { de, uk } from 'date-fns/locale'
import { Button } from 'primereact/button'
import { ButtonGroup } from 'primereact/buttongroup'
import { SelectButton } from 'primereact/selectbutton'
import { useState } from 'react'
import { Calendar, dateFnsLocalizer, ToolbarProps, View } from 'react-big-calendar'

const locales = {
  de,
  uk,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const viewSelectorItems: { name: string; value: View }[] = [
  { name: 'Month', value: 'month' },
  { name: 'Week', value: 'week' },
  { name: 'Day', value: 'day' },
]

export const CalendarExamplePage = () => {
  const [currentView, setCurrentView] = useState<View>('month')

  return (
    <main>
      <h1>Calendar</h1>
      <Calendar
        className="Calendar"
        localizer={localizer}
        defaultView="month"
        view={currentView}
        onView={(view) => setCurrentView(view)}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: (props: ToolbarProps) => {
            return (
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <ButtonGroup>
                    <Button
                      icon="pi pi-angle-left"
                      onClick={() => {
                        props.onNavigate('PREV')
                      }}
                    />
                    <Button
                      icon="pi pi-angle-right"
                      onClick={() => {
                        props.onNavigate('NEXT')
                      }}
                    />
                  </ButtonGroup>
                  <Button
                    label="Today"
                    onClick={() => {
                      props.onNavigate('TODAY')
                    }}
                  />
                </div>

                {
                  <p className="text-fullcalendar-title font-fullcalendar-title leading-fullcalendar-title text-shade-700">
                    {format(props.date, 'MMMM yyyy')}
                  </p>
                }
                <SelectButton
                  value={currentView}
                  onChange={(e) => {
                    if (e.value) {
                      setCurrentView(e.value)
                    }
                  }}
                  optionLabel="name"
                  options={viewSelectorItems}
                />
              </div>
            )
          },
          timeGutterWrapper: () => null,
          timeGutterHeader: () => null,
        }}
        style={{ height: 'calc(100vh - 210px)' }}
      />
    </main>
  )
}
