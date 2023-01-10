import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, AuthType } from '../../app/api'

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setLoginAC> | ReturnType<typeof setInitializeAC>

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: action.value }
    case 'INITIALIZE':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}
// actions
export const setLoginAC = (value: boolean) => ({ type: 'LOGIN', value } as const)

export const setInitializeAC = (value: boolean) => ({ type: 'INITIALIZE', value } as const)

//thunks
export const signInTC = (data: AuthType) => (dispatch: Dispatch<ActionsType>) => {
  authAPI
    .login(data)
    .then(res => {
      console.log(res)
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      console.log('error: ', error)
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
