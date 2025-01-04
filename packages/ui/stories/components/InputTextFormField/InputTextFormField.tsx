import clsx from 'clsx'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText as PrimeInputText, InputTextProps as PrimeInputTextProps } from 'primereact/inputtext'
import { memo, RefAttributes } from 'react'
import { Control, Controller, ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

interface BaseInputTextProps extends Omit<PrimeInputTextProps, 'className'> {
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

export interface InputTextProps<T extends FieldValues> extends BaseInputTextProps, RefAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
}

interface MemoizedInputTextProps<T extends FieldValues> extends BaseInputTextProps {
  field: ControllerRenderProps<T, Path<T>>
}

function MemoizedInputText<T extends FieldValues>({
  field,
  error,
  hasFloatLabel,
  label,
  className,
  invalid,
  ...otherProps
}: MemoizedInputTextProps<T>) {
  const inputElement = (
    <PrimeInputText
      id={field.name}
      {...otherProps}
      {...field}
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
const MemoizedInputTextComponent = memo(MemoizedInputText) as typeof MemoizedInputText

export const InputTextFormField = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  hasFloatLabel,
  className,
  ...otherProps
}: InputTextProps<T>) => {
  return (
    <div className={className?.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MemoizedInputTextComponent<T>
            field={field}
            error={error}
            hasFloatLabel={hasFloatLabel}
            label={label}
            className={className}
            {...otherProps}
          />
        )}
      />
      {error && (
        <p className={className?.error ? clsx('text-error', className?.error) : 'text-error pt-1'}>{error.message}</p>
      )}
    </div>
  )
}
