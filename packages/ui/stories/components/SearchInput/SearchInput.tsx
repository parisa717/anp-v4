import clsx from 'clsx'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText, InputTextProps } from 'primereact/inputtext'
import { useRef } from 'react'

interface SearchInputProps extends InputTextProps {
  onSearch: (query: string) => void
}

export const SearchInput = ({ value = '', onSearch, className, ...props }: SearchInputProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <IconField className="relative inline-flex">
      <InputText
        data-cy="search-input"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className={clsx('w-full', className)}
        {...props}
      />

      {value && value.length > 0 ? (
        <button
          data-cy="search-input-clear"
          ref={buttonRef}
          className="p-input-icon cursor-pointer bg-[transparent] p-0 border-0 flex"
          onClick={() => {
            onSearch('')
            buttonRef.current?.focus()
          }}
        >
          <InputIcon className="pi pi-times text-input-icon" />
        </button>
      ) : (
        <InputIcon className="pi pi-search text-input-icon" />
      )}
    </IconField>
  )
}
