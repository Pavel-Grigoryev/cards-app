import { AxiosError } from 'axios'

import { handleServerNetworkError } from '../common/utils/error-utils'
import { setLoginAC } from '../features/auth/auth-reducer'
import { setProfileAC } from '../features/Profile/profile-reducer'

import { authAPI } from './api'
import { AppThunk } from './store'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInit: false,
}

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: ActionsType
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-INITIALIZED':
      return { ...state, isInit: action.isInit }
    default:
      return state
  }
}

//Actions

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setAppInitializedAC = (isInit: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', isInit } as const)

//Thunk

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('loading'))

  authAPI
    .me()
    .then(res => {
      dispatch(setLoginAC(true))
      dispatch(setProfileAC({ profile: res.data }))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(setAppInitializedAC(true))
      dispatch(setAppStatusAC('idle'))
    })
}

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = typeof initialState

type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

export type ActionsType = SetAppStatusAT | SetAppErrorAT | SetAppInitializedAT
