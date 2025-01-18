import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { useGetQualificationsQuery } from '@/entities/qualification'

interface CalendarFiltersProps {
  setFilters: Dispatch<SetStateAction<string[]>>
  filters: string[]
}

export const CalendarFilters = ({ setFilters, filters }: CalendarFiltersProps) => {
  const { data: qualificationsQueryData = [], isLoading: isQualificationsQueryLoading } = useGetQualificationsQuery()

  useEffect(() => {
    if (qualificationsQueryData) {
      setFilters(qualificationsQueryData?.map((qualification) => qualification.name))
    }
  }, [qualificationsQueryData, setFilters])

  if (isQualificationsQueryLoading) return <div>Loading...</div>
  if (!qualificationsQueryData.length) return <div>No filter available!</div>

  return (
    <div className="flex gap-5">
      {qualificationsQueryData.map(({ name }) => {
        const isFilterApplied = filters.includes(name)

        const onChange = (event: CheckboxChangeEvent) =>
          isFilterApplied ? setFilters(filters.filter((f) => f !== name)) : setFilters([...filters, event.target.value])

        return (
          <div key={name} className="flex items-center">
            <Checkbox inputId={name} value={name} checked={isFilterApplied} onChange={onChange} />
            <label htmlFor={name} className="ml-2.5 text-shade-700">
              {name}
            </label>
          </div>
        )
      })}
    </div>
  )
}
