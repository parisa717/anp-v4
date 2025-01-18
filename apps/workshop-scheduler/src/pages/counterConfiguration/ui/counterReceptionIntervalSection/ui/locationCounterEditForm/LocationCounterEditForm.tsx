import { useTranslation } from '@nexus-ui/i18n'
import { range } from '@nexus-ui/utils'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'

import { useGetCurrentLocation } from '@/entities/location'
import { useUpdateLocationCounterReceptionIntervalMutation } from '@/entities/locationCounter'

const MIN_SLOT_FREQUENCY_VALUE = 5
const MAX_SLOT_FREQUENCY_VALUE = 60
const RECEPTION_INTERVAL_VALUE = 5

interface LocationCounterEditFormProps {
  counterReceptionInterval: number
  onCancel: () => void
}

export const LocationCounterEditForm = ({ counterReceptionInterval, onCancel }: LocationCounterEditFormProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.counterConfiguration.sections.counterReceptionInterval.${key}`)

  const locationId = useGetCurrentLocation()
  const [updateLocationCounterMutate, { isLoading: isUpdateLocationCounterMutationLoading }] =
    useUpdateLocationCounterReceptionIntervalMutation()

  const [slotFrequency, setSlotFrequency] = useState(counterReceptionInterval)

  const counterReceptionIntervalDropdownOptions = range(
    MIN_SLOT_FREQUENCY_VALUE,
    MAX_SLOT_FREQUENCY_VALUE,
    RECEPTION_INTERVAL_VALUE,
  ).map((minutes) => ({
    label: `${minutes} ${t('minutes')}`,
    value: minutes,
  }))

  const handleSaveButtonClick = async () => {
    const result = await updateLocationCounterMutate({ locationId, receptionInterval: slotFrequency })

    if (result.data && !result.error) {
      onCancel()
    }
  }

  return (
    <section className="flex basis-1/2 bg-root-surface-card rounded h-min py-3.5 px-4 justify-between items-center">
      <p className="m-0 px-2 font-bold">{translate('slotFrequency')}</p>
      <div className="flex gap-2 items-center">
        <p className="m-0 capitalize">{t('every')}</p>
        <Dropdown
          options={counterReceptionIntervalDropdownOptions}
          value={slotFrequency}
          onChange={(event) => setSlotFrequency(event.target.value)}
        />
      </div>
      <div className="flex gap-1.5">
        <Button
          type="button"
          severity="secondary"
          outlined
          onClick={onCancel}
          label={t('cancel')}
          className="capitalize"
        />
        <Button
          onClick={handleSaveButtonClick}
          label={t('save')}
          className="capitalize"
          loading={isUpdateLocationCounterMutationLoading}
        />
      </div>
    </section>
  )
}
