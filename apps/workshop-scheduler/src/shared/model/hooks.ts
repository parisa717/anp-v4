import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

/** documentation: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks **/

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
