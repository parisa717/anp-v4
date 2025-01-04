import clsx from 'clsx'
import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import { memo } from 'react'
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

interface BaseCheckboxProps extends Omit<CheckboxProps, 'checked' | 'onChange' | 'className'> {
  error?: FieldError
  label?: string
  className?: {
    container?: string
    input?: string
    label?: string
  }
}

export interface CheckboxWithLabelProps<T extends FieldValues> extends BaseCheckboxProps {
  name: Path<T>
  control: Control<T>
}

interface MemoizedCheckboxProps<T extends FieldValues> extends BaseCheckboxProps {
  field: ControllerRenderProps<T, Path<T>>
}

function MemoizedCheckbox<T extends FieldValues>({
  field,
  error,
  label,
  className,
  invalid,
  ...otherProps
}: MemoizedCheckboxProps<T>) {
  const componentId = otherProps.id ? otherProps.id : field.name

  const renderLabel = () => {
    if (label) {
      return (
        <label htmlFor={componentId} className={clsx('ml-2 whitespace-normal', className?.label)}>
          {label}
        </label>
      )
    }
    return null
  }

  const checkboxElement = (
    <Checkbox
      id={componentId}
      {...otherProps}
      checked={!!field.value}
      onChange={(e) => field.onChange(e.checked)}
      invalid={invalid || Boolean(error?.message)}
      className={clsx('shrink-0', className?.input)}
    />
  )
  return (
    <div className="inline-flex items-center">
      {checkboxElement}
      {renderLabel()}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const MemoizedCheckboxComponent = memo(MemoizedCheckbox) as typeof MemoizedCheckbox

export const CheckboxFormField = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  className,
  ...otherProps
}: CheckboxWithLabelProps<T>) => {
  return (
    <div className={className?.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MemoizedCheckboxComponent<T>
            name={name}
            field={field}
            error={error}
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
