import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'
import { useState } from 'react'

import { BaseLayout } from '@/widgets/baseLayout'
import { CreateBookingStepperModal } from '@/widgets/createBooking'

export const AppLayout = () => {
  const { t } = useTranslation()

  const [isCreateBookingStepperModalOpen, setIsCreateBookingStepperModalOpen] = useState(false)

  const handleCreateBookingStepperModalClose = () => setIsCreateBookingStepperModalOpen(false)
  const handleCreateBookingStepperModalOpen = () => setIsCreateBookingStepperModalOpen(true)

  return (
    <BaseLayout>
      <Button
        label={t('widgets.baseLayout.topbar.bookAppointment')}
        icon="pi pi-chevron-right"
        iconPos="right"
        onClick={handleCreateBookingStepperModalOpen}
      />
      {isCreateBookingStepperModalOpen && <CreateBookingStepperModal onClose={handleCreateBookingStepperModalClose} />}
    </BaseLayout>
  )
}
