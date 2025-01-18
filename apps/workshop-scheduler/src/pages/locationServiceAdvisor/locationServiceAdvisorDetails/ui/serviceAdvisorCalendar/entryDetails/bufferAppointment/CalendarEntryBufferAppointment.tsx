import { useState } from 'react'
import { Event } from 'react-big-calendar'

import { CalendarEntryBufferAppointmentDetails } from './details/CalendarEntryBufferAppointmentDetails'
import { CalendarEntryBufferAppointmentEdit } from './edit/CalendarEntryBufferAppointmentEdit'

type Props = {
  entry: Event
  onClose: VoidFunction
}

export const CalendarEntryBufferAppointment = ({ entry, onClose }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)

  const handleShowEdition = () => setIsEditMode(true)
  const handleCloseEdition = () => setIsEditMode(false)

  if (isEditMode) {
    return <CalendarEntryBufferAppointmentEdit entry={entry} onCancel={handleCloseEdition} onSave={onClose} />
  }

  return <CalendarEntryBufferAppointmentDetails entry={entry} onClose={onClose} onOpenEdit={handleShowEdition} />
}
