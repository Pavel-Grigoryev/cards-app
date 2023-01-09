import { setLoginAC } from '../features/auth/login/auth-reducer'
import { setProfileAC } from '../features/profile/profile-reducer'

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

export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    dispatch(setLoginAC(true))
    dispatch(setProfileAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = typeof initialState

type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

export type ActionsType = SetAppStatusAT | SetAppErrorAT | SetAppInitializedAT
