import clsx from 'clsx'
import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { memo } from 'react'
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

interface BaseSelectBoxProps extends Omit<DropdownProps, 'value' | 'onChange' | 'className'> {
  error?: FieldError
  label?: string
  hasFloatLabel?: boolean
  className?: {
    container?: string
    input?: string
    label?: string
    floatLabelContainer?: string
  }
}

export interface SelectBoxFormFieldProps<T extends FieldValues> extends BaseSelectBoxProps {
  name: Path<T>
  control: Control<T>
}

interface MemoizedSelectBoxProps<T extends FieldValues> extends BaseSelectBoxProps {
  field: ControllerRenderProps<T, Path<T>>
}

function MemoizedSelectBox<T extends FieldValues>({
  field,
  error,
  hasFloatLabel,
  label,
  className,
  invalid,
  ...otherProps
}: MemoizedSelectBoxProps<T>) {
  const componentId = otherProps.id ? otherProps.id : field.name

  const renderLabel = () => {
    if (label) {
      return (
        <label htmlFor={componentId} className={clsx(hasFloatLabel ? 'pb-1' : 'pb-2 block', className?.label)}>
          {label}
        </label>
      )
    }
    return null
  }

  const selectBoxElement = (
    <Dropdown
      id={componentId}
      {...otherProps}
      value={field.value}
      onChange={(e) => field.onChange(e.value)}
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
        {selectBoxElement}
        {renderLabel()}
      </FloatLabel>
    )
  }

  return (
    <>
      {renderLabel()}
      {selectBoxElement}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const MemoizedSelectBoxComponent = memo(MemoizedSelectBox) as typeof MemoizedSelectBox

export const SelectBoxFormField = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  hasFloatLabel,
  className,
  ...otherProps
}: SelectBoxFormFieldProps<T>) => {
  return (
    <div className={className?.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MemoizedSelectBoxComponent<T>
            field={field}
            error={error}
            hasFloatLabel={hasFloatLabel}
            label={label}
            className={className}
            {...otherProps}
          />
        )}
      />
      {error && <p className="text-error pt-1">{error.message}</p>}
    </div>
  )
}
