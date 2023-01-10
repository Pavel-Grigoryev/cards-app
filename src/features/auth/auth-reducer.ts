import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, AuthType } from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { setProfileAC } from '../profile/profile-reducer'

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

type InitialStateType = typeof initialState

type ActionsType =
  | ReturnType<typeof setLoginAC>
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}
// actions
export const setLoginAC = (value: boolean) => ({ type: 'LOGIN', value } as const)

//thunks
export const signInTC = (data: AuthType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .login(data)
    .then(res => {
      dispatch(setProfileAC(res.data))
      dispatch(setLoginAC(true))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(error))
    })
}

export const signUpTC = (data: AuthType) => (dispatch: Dispatch<ActionsType>) => {
  authAPI
    .signup(data)
    .then(res => {
      console.log(res)
      //setLoginAC(true)
      //редирект на логин??
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      console.log('error: ', error)
    })
}
