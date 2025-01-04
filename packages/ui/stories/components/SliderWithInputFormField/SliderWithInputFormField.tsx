import { Slider } from '@nexus-ui/ui'
import { InputNumber } from 'primereact/inputnumber'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface SliderWithInputFormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  maxValue?: number
  minValue?: number
  step?: number
}

export const SliderWithInputFormField = <T extends FieldValues>({
  name,
  control,
  maxValue = 100,
  minValue = 0,
  step = 5,
}: SliderWithInputFormFieldProps<T>) => {
  const getSliderValue = (value: number) => {
    if (value > maxValue) return maxValue
    if (value < minValue) return minValue
    return value
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="flex flex-col flex-1">
            <InputNumber value={value} onChange={(e) => onChange(e.value)} data-cy="slider-with-input-input-number" />
            <Slider
              value={getSliderValue(value)}
              onChange={(e) => onChange(e.value)}
              max={maxValue}
              min={minValue}
              step={step}
            />
            <p className="text-error mb-0 mt-2">{error?.message}</p>
          </div>
        )
      }}
    />
  )
}
