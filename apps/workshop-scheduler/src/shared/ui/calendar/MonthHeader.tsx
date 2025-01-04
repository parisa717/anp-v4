import { HeaderProps } from 'react-big-calendar'

export const MonthHeader = (props: HeaderProps) => {
  return (
    <div className="bg-shade-100 text-base text-shade-700">
      <span role="columnheader" className="text-base">
        {props.label}
      </span>
    </div>
  )
}
