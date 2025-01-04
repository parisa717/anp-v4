import merge from 'lodash/merge'
import { Slider as PrimeReactSlider, SliderProps } from 'primereact/slider'

const defaultSliderPt = {
  root: { className: 'w-full' },
  range: { className: 'bg-teal-700' },
  handle: { className: 'border-teal-700' },
}

export const Slider = ({ pt: customSliderPt = {}, ...rest }: SliderProps) => {
  return <PrimeReactSlider pt={merge({ ...defaultSliderPt, ...customSliderPt })} {...rest} />
}
