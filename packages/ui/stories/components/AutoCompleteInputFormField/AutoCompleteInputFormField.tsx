import clsx from 'clsx'
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
  AutoCompleteProps,
} from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { InputIcon } from 'primereact/inputicon'
import { memo, useEffect, useState } from 'react'
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

interface BaseAutoCompleteProps extends Omit<AutoCompleteProps, 'field' | 'className'> {
  error?: FieldError
  label?: string
  hasFloatLabel?: boolean
  completeMethod?: (event: AutoCompleteCompleteEvent) => void
  initialSuggestions: AutoCompleteSuggestionItem[]
  className?: {
    container?: string
    input?: string
    label?: string
    floatLabelContainer?: string
  }
}

export interface AutoCompleteInputFormFieldProps<T extends FieldValues> extends BaseAutoCompleteProps {
  name: Path<T>
  control: Control<T>
}

interface MemoizedAutoCompleteProps<T extends FieldValues> extends BaseAutoCompleteProps {
  field: ControllerRenderProps<T, Path<T>>
}

export interface AutoCompleteSuggestionItem {
  label: string
  value: number | string
}

const MemoizedAutoComplete = <T extends FieldValues>({
  field,
  error,
  hasFloatLabel,
  label,
  initialSuggestions,
  pt,
  itemTemplate,
  dropdownIcon,
  dropdown = true,
  className,
  completeMethod,
  invalid,
  ...otherProps
}: MemoizedAutoCompleteProps<T>) => {
  const [items, setItems] = useState<AutoCompleteSuggestionItem[]>(initialSuggestions)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const selectedItem = initialSuggestions.find((item) => item.value === field.value)
    setInputValue(selectedItem ? selectedItem.label : '')
  }, [field.value, initialSuggestions])

  const handleChange = (e: AutoCompleteChangeEvent) => {
    if (typeof e.value === 'string') {
      /**
       * Case when user is typing
       */
      setInputValue(e.value)
    } else {
      /**
       * Case when User selected an item
       */
      setInputValue(e.value.label)
      field.onChange(e.value.value)
    }
  }

  const defaultHandleCompleteMethod = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const filteredSuggestions = initialSuggestions.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(query),
    )
    setItems(filteredSuggestions)
  }

  const defaultItemTemplate = (item: AutoCompleteSuggestionItem) => {
    return <div>{item.label}</div>
  }

  const defaultDropdownIcon = <InputIcon className="pi pi-search text-input-icon" />

  const defaultAutoCompleteAttributes = {
    input: { root: { className: 'border-r-0' } },
    dropdownButton: { root: { className: 'bg-input border-input border-l-0' } },
  }

  const autoCompleteElement = (
    <AutoComplete
      id={field.name}
      {...otherProps}
      {...field}
      dropdown={dropdown}
      value={inputValue}
      onChange={handleChange}
      completeMethod={completeMethod || defaultHandleCompleteMethod}
      suggestions={items}
      itemTemplate={itemTemplate || defaultItemTemplate}
      dropdownIcon={dropdownIcon || defaultDropdownIcon}
      pt={pt || defaultAutoCompleteAttributes}
      invalid={invalid || Boolean(error?.message)}
      className={className?.input}
    />
  )

  if (hasFloatLabel) {
    return (
      <FloatLabel
        pt={{
          root: {
            className: className?.floatLabelContainer,
          },
        }}
      >
        {autoCompleteElement}
        {label && (
          <label htmlFor={field.name} className={clsx(className?.label)}>
            {label}
          </label>
        )}
      </FloatLabel>
    )
  }

  return (
    <>
      {label && (
        <label htmlFor={field.name} className={clsx('pb-2 block', className?.label)}>
          {label}
        </label>
      )}
      {autoCompleteElement}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const MemoizedAutoCompleteComponent = memo(MemoizedAutoComplete) as typeof MemoizedAutoComplete

export const AutoCompleteInputFormField = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  hasFloatLabel,
  initialSuggestions,
  className,
  ...otherProps
}: AutoCompleteInputFormFieldProps<T>) => {
  return (
    <div className={className?.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MemoizedAutoCompleteComponent<T>
            field={field}
            error={error}
            hasFloatLabel={hasFloatLabel}
            label={label}
            className={className}
            initialSuggestions={initialSuggestions}
            {...otherProps}
          />
        )}
      />
      {error && <p className="text-error pt-1">{error.message}</p>}
    </div>
  )
}
