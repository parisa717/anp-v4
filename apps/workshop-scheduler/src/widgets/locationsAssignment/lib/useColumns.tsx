import { useTranslation } from '@nexus-ui/i18n'
import { DataTableMultiSelect, DataTableSearchInput } from '@nexus-ui/ui'
import clsx from 'clsx'
import { FilterMatchMode, FilterService } from 'primereact/api'
import { Checkbox, CheckboxChangeEvent, CheckboxProps } from 'primereact/checkbox'
import { ColumnProps } from 'primereact/column'
import { useEffect, useRef, useState } from 'react'

import { WorkshopWorkLocationWorkEntity } from '@/entities/work'

import { LocationEntity, SelectedLocationEntity } from '../model/types'

// Custom filtering is enabled by defining a filter function using FilterService.register where the rule argument must be "custom_[field]" and the filter match mode of the field must be FilterMatchMode.CUSTOM. https://primereact.org/datatable/#custom_filter
FilterService.register('custom_brands', (brands: LocationEntity['brands'], filterValue: string[]) => {
  if (!filterValue || !brands) return true
  if (filterValue.length === 0) return true
  return brands.some(({ id }) => filterValue.includes(id))
})

export const useColumns = (
  brands: WorkshopWorkLocationWorkEntity['location']['brands'],
  selectedLocations: SelectedLocationEntity[],
  onChange: (updatedLocations: SelectedLocationEntity[]) => void,
  filteredLocations: LocationEntity[],
) => {
  const hasRun = useRef(false)
  const { t } = useTranslation()
  const translate = (key: string) => t(`pages.work.add.assignLocations.table.${key}`)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  useEffect(() => {
    if (brands && brands.length > 0 && !hasRun.current) {
      setSelectedBrands(brands.map(({ id }) => id))
      hasRun.current = true
    }
  }, [brands])

  const updateLocations = (updater: (prevLocations: SelectedLocationEntity[]) => SelectedLocationEntity[]) => {
    const updatedLocations = updater(selectedLocations)
    onChange(updatedLocations)
  }

  const renderCheckbox = ({
    isChecked,
    onChange,
    hasLabel = false,
    labelKey,
  }: {
    isChecked: boolean
    onChange: (event: CheckboxChangeEvent) => void
    hasLabel?: boolean
    labelKey?: string
  }) => {
    return (
      <div className="flex items-center">
        <Checkbox
          data-cy={`${labelKey}-checkbox`}
          onChange={onChange}
          checked={isChecked}
          pt={{
            box: (props: CheckboxProps) => ({
              className: isChecked
                ? 'bg-checkbox-active-background border-checkbox-active-borderColor'
                : props?.pt?.box,
            }),
          }}
        />
        {hasLabel && <label className="ml-2 whitespace-normal">{translate(labelKey ?? '')}</label>}
      </div>
    )
  }

  const checkboxTemplates = {
    isSelected: (entity: LocationEntity) =>
      renderCheckbox({
        isChecked: selectedLocations?.some((loc) => loc.id === entity.id),
        onChange: (e) => {
          updateLocations((prev) =>
            e.checked
              ? [
                  ...prev,
                  {
                    id: entity.id,
                    isRecommended: false,
                    brandIds: entity.brands.map((brand) => brand.id),
                  },
                ]
              : prev.filter((loc) => loc.id !== entity.id),
          )
        },
        labelKey: 'isSelected',
      }),
    isRecommended: (entity: LocationEntity) =>
      renderCheckbox({
        isChecked: selectedLocations?.some((loc) => loc.id === entity.id && loc.isRecommended),
        onChange: (e) => {
          updateLocations((prev) => {
            const isLocationInSelected = prev?.some((loc) => loc.id === entity.id)

            if (e.checked && !isLocationInSelected) {
              return [
                ...prev,
                {
                  id: entity.id,
                  isRecommended: true,
                  brandIds: entity.brands.map((brand) => brand.id),
                },
              ]
            }

            return prev.map((loc) =>
              loc.id === entity.id
                ? {
                    ...loc,
                    isRecommended: !!e.checked,
                  }
                : loc,
            )
          })
        },
        hasLabel: true,
        labelKey: 'isRecommended',
      }),
  }

  const brandsTemplate = (entity: LocationEntity) => {
    const selectedLocation = selectedLocations?.find((loc) => loc.id === entity.id)
    const entityFilteredBrands =
      selectedBrands.length > 0 ? entity.brands.filter((brand) => selectedBrands.includes(brand.id)) : entity.brands

    return (
      <div className="flex flex-col gap-2">
        {entityFilteredBrands.map((brand, index) => (
          <div
            key={brand.id}
            className={clsx(
              'inline-flex items-center pl-2',
              index !== entityFilteredBrands.length - 1 && 'border-0 border-solid border-b-table-footer-cell',
              entityFilteredBrands.length > 1 && index !== entityFilteredBrands.length - 1 && 'pb-2',
            )}
          >
            <Checkbox
              data-cy="brand-checkbox"
              onChange={(e) => {
                updateLocations((prev) => {
                  const isLocationSelected = prev?.some((loc) => loc.id === entity.id)

                  if (!isLocationSelected) {
                    return [
                      ...prev,
                      {
                        id: entity.id,
                        isRecommended: false,
                        brandIds: e.checked ? [brand.id] : [],
                      },
                    ]
                  }
                  return prev.map((loc) => {
                    if (loc.id === entity.id) {
                      const updatedBrandIds = e.checked
                        ? [...(loc.brandIds || []), brand.id]
                        : (loc.brandIds || []).filter((id) => id !== brand.id)

                      if (updatedBrandIds.length === 0) {
                        return loc
                      }

                      return {
                        ...loc,
                        brandIds: updatedBrandIds,
                      }
                    }
                    return loc
                  })
                })
              }}
              checked={selectedLocation?.brandIds.includes(brand.id) ?? false}
              pt={{
                box: (props: CheckboxProps) => ({
                  className: selectedLocation?.brandIds.includes(brand.id)
                    ? 'bg-checkbox-active-background border-checkbox-active-borderColor'
                    : props?.pt?.box,
                }),
              }}
            />
            <label className="ml-2 whitespace-normal">{brand.code}</label>
          </div>
        ))}
      </div>
    )
  }

  const parentCheckboxTemplate = (parent: {
    props: {
      value: LocationEntity[]
    }
  }) => (
    <Checkbox
      onChange={(e) => {
        if (e.checked) {
          updateLocations((prev) => {
            const selectedIds = new Set(prev.map((loc) => loc.id))

            const newLocations = parent.props.value
              .filter((location) => !selectedIds.has(location.id))
              .map((location) => ({
                id: location.id,
                isRecommended: false,
                brandIds: location.brands?.map((b) => b.id) || [],
              }))

            return [...prev, ...newLocations]
          })
        } else {
          updateLocations((prev) =>
            prev.filter((loc) => !parent.props.value?.some((location) => location.id === loc.id)),
          )
        }
      }}
      checked={
        filteredLocations.length > 0 &&
        filteredLocations.every((location) => selectedLocations?.some((selected) => selected.id === location.id))
      }
    />
  )

  const columns: ColumnProps[] = [
    {
      header: parentCheckboxTemplate,
      body: (entity: LocationEntity) => checkboxTemplates.isSelected(entity),
      field: 'isSelected',
    },
    {
      field: 'code',
      header: translate('locationId'),
      sortable: true,
      filter: true,
      showFilterMenu: false,
      showClearButton: false,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
    },
    {
      field: 'name',
      header: translate('locationName'),
      sortable: true,
      filter: true,
      showFilterMenu: false,
      showClearButton: false,
      filterMatchMode: FilterMatchMode.CONTAINS,
      filterElement: DataTableSearchInput,
    },
    {
      field: 'brands',
      header: translate('brand'),
      filter: true,
      showFilterMenu: false,
      showClearButton: false,
      filterMatchMode: FilterMatchMode.CUSTOM,
      filterElement: (options) =>
        DataTableMultiSelect({
          options: brands || [],
          optionLabel: 'code',
          optionValue: 'id',
          value: selectedBrands,
          onChange: (e) => {
            setSelectedBrands(e.value)
            options.filterApplyCallback(e.value)
          },
        })(options),
      body: brandsTemplate,
    },

    {
      body: (entity: LocationEntity) => checkboxTemplates.isRecommended(entity),
      field: 'isRecommended',
    },
  ]

  return columns
}
