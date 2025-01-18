import clsx from 'clsx'

interface LabelValueProps {
  label: string
  value: string | number | undefined
  className?: {
    root?: string
    label?: string
    value?: string
  }
}

export const LabelValue = ({ label, value, className }: LabelValueProps) => {
  return (
    <div className={clsx('flex gap-8', className?.root)}>
      <p className={clsx('flex-1 m-0 min-w-44', className?.label)}>{label}:</p>
      <p className={clsx('flex-1 m-0 font-semibold', className?.value)}>{value || '-'}</p>
    </div>
  )
}
