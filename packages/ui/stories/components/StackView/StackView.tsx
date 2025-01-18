import { ReactNode, useState } from 'react'

import { StackViewContext } from './StackViewContext'

interface StackViewProps {
  children: ReactNode[]
  openView?: number
}

export const StackView = ({ children, openView = 0 }: StackViewProps) => {
  const [openViewIndex, setOpenViewIndex] = useState(openView)

  const openNextView = () => {
    setOpenViewIndex((currentIndex) => {
      const isLastView = currentIndex === children.length - 1
      return isLastView ? currentIndex : currentIndex + 1
    })
  }

  const openPreviousView = () => {
    setOpenViewIndex((currentIndex) => {
      const isFirstView = currentIndex === 0
      return isFirstView ? currentIndex : currentIndex - 1
    })
  }

  return (
    <StackViewContext.Provider
      value={{
        setOpenViewIndex,
        openNextView,
        openPreviousView,
      }}
    >
      {children[openViewIndex]}
    </StackViewContext.Provider>
  )
}
