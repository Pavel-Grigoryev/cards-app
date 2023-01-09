import { authAPI } from './api'
import { AppThunk } from './store'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
  isAuth: false,
}

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: AppActionsType
): InitialAppStateType => {
  switch (action.type) {
    default:
      return state
  }
}

//Actions

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)

//Thunks

export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    // dispatch(setIsLoggedInAC(true))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

//Types

export type InitialAppStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type SetAppInitializedAT = ReturnType<typeof setAppInitializedAC>
type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

export type AppActionsType = SetAppStatusAT | SetAppErrorAT | SetAppInitializedAT
