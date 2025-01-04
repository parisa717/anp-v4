import clsx from 'clsx'
import { ReactElement } from 'react'

interface TopbarProps {
  title: string
  left?: ReactElement
  right?: ReactElement
}

const titleColors = ['text-theme-primary']

export const Topbar = ({ title, left, right }: TopbarProps) => {
  const titleList = title.split(' ')

  return (
    <div
      className="grid grid-cols-3 gap-4 items-center justify-between bg-surface-0 pt-topbar-top pb-topbar-bottom pr-topbar-right pr-topbar-right rounded-border-radius h-[56px]"
      data-cy="topbar"
    >
      <div className="gap-3 flex" data-cy="topbar-left">
        {left}
      </div>

      <div
        className="
          flex justify-center
          text-text
          text-text-3xl-bold-lineheight-150 font-text-3xl-bold-lineheight-150 leading-text-3xl-bold-lineheight-150
        "
        data-cy="topbar-title"
      >
        AVAG
        <span className="capitalize" data-cy="topbar-subtitle">
          {titleList.map((title, i) => (
            <span className={clsx('ml-2', titleColors[i])} key={i}>
              {title}
            </span>
          ))}
        </span>
      </div>

      <div className="gap-3 flex justify-end" data-cy="topbar-right">
        {right}
      </div>
    </div>
  )
}
