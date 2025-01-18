import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface IStackViewContext {
  openNextView: () => void
  openPreviousView: () => void
  setOpenViewIndex: Dispatch<SetStateAction<number>>
}

export const StackViewContext = createContext<IStackViewContext>({
  openNextView: () => {},
  openPreviousView: () => {},
  setOpenViewIndex: () => {},
})

export const useStackView = () => useContext(StackViewContext)
