import { useTranslation } from '@nexus-ui/i18n'
import { Button } from 'primereact/button'

import { CustomerAndVehicleFormType } from '../../../../model/formSchema'
import { type Filter, FilterBadge } from '../filterBadge'

interface FilterBadgesListProps {
  filters: Filter[]
  onFilterRemove: (filterName: keyof CustomerAndVehicleFormType) => void
  onFiltersClear: () => void
}

export const FilterBadgesList = ({ filters, onFiltersClear, onFilterRemove }: FilterBadgesListProps) => {
  const { t } = useTranslation()
  const translate = (key: string) => t(`widgets.createBooking.steps.customerAndVehicle.searchFilters.${key}`)

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <p className="m-0 text-nowrap">{translate('searchingCriteria')}</p>
        <div className="flex gap-4 flex-wrap">
          {filters.map((filter) => (
            <FilterBadge key={filter.label} filter={filter} onRemove={() => onFilterRemove(filter.label)} />
          ))}
        </div>
      </div>
      <Button
        onClick={onFiltersClear}
        label={t('clear')}
        className="text-nowrap shrink-0"
        outlined
        severity="secondary"
      />
    </div>
  )
}
