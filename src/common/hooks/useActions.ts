import { useMemo } from 'react'

import { ActionCreatorsMapObject, bindActionCreators } from 'redux'

import { useAppDispatch } from '../../app/store'

type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
export type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
export type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
  ? IsValidArg<A> extends true
    ? (a: A) => TNewReturn
    : () => TNewReturn
  : never
export type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch),
    [actions, dispatch]
  )
}
