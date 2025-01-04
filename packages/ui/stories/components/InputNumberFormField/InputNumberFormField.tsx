import clsx from 'clsx'
import { FloatLabel } from 'primereact/floatlabel'
import { InputNumber as PrimeInputNumber, InputNumberProps as PrimeInputNumberProps } from 'primereact/inputnumber'
import { memo, RefAttributes } from 'react'
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

interface BaseInputNumberProps extends Omit<PrimeInputNumberProps, 'className'> {
  error?: FieldError
  label?: string
  hasFloatLabel?: boolean
  className?: {
    container?: string
    input?: string
    label?: string
    floatLabelContainer?: string
    error?: string
  }
}

export interface InputNumberFormFieldProps<T extends FieldValues>
  extends BaseInputNumberProps,
    RefAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
}

interface MemoizedInputNumberProps<T extends FieldValues> extends BaseInputNumberProps {
  field: ControllerRenderProps<T, Path<T>>
}

function MemoizedInputNumber<T extends FieldValues>({
  field,
  error,
  hasFloatLabel,
  label,
  className,
  invalid,
  ...otherProps
}: MemoizedInputNumberProps<T>) {
  const inputElement = (
    <PrimeInputNumber
      id={field.name}
      {...otherProps}
      {...field}
      onChange={(e) => field.onChange(e.value)}
      onValueChange={(e) => field.onChange(e)}
      invalid={invalid || Boolean(error?.message)}
      inputClassName={className?.input}
      useGrouping={false}
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
        {inputElement}
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
      {inputElement}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const MemoizedInputNumberComponent = memo(MemoizedInputNumber) as typeof MemoizedInputNumber

export const InputNumberFormField = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  hasFloatLabel,
  className,
  ...otherProps
}: InputNumberFormFieldProps<T>) => {
  return (
    <div className={className?.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MemoizedInputNumberComponent<T>
            field={field}
            error={error}
            hasFloatLabel={hasFloatLabel}
            label={label}
            className={className}
            {...otherProps}
          />
        )}
      />
      {error && <p className={clsx('text-error pt-1', className?.error)}>{error.message}</p>}
    </div>
  )
}
