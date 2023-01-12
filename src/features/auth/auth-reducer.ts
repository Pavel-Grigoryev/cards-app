import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, AuthType, ForgotType, SetNewPasswordType } from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { clearProfileDataAC, setProfileAC } from '../profile/profile-reducer'

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  checkEmail: false,
  saveEmail: '',
  setNewPassword: false,
}

type InitialStateType = typeof initialState

type ActionsType =
  | ReturnType<typeof setLoginAC>
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof checkEmailAC>
  | ReturnType<typeof saveEmailAC>
  | ReturnType<typeof setNewPasswordAC>

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: action.value }
    case 'CHECK-EMAIL':
      return { ...state, checkEmail: action.value }
    case 'SAVE-EMAIL':
      return { ...state, saveEmail: action.value }
    case 'SET-NEW-PASSWORD':
      return { ...state, setNewPassword: action.value }
    default:
      return state
  }
}
// actions
export const setLoginAC = (value: boolean) => ({ type: 'LOGIN', value } as const)

export const checkEmailAC = (value: boolean) => ({ type: 'CHECK-EMAIL', value } as const)

export const saveEmailAC = (value: string) => ({ type: 'SAVE-EMAIL', value } as const)

export const setNewPasswordAC = (value: boolean) => ({ type: 'SET-NEW-PASSWORD', value } as const)

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

      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(error))
    })
}

export const passwordRecoveryTC = (data: ForgotType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(saveEmailAC(data.email))
  authAPI
    .forgot(data)
    .then(res => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(checkEmailAC(true))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(error))
    })
}

export const setNewPasswordTC = (data: SetNewPasswordType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .setNewPassword(data)
    .then(res => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setNewPasswordAC(true))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(error))
    })
}

export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(() => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setLoginAC(false))
      dispatch(clearProfileDataAC())
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(error))
    })
}
