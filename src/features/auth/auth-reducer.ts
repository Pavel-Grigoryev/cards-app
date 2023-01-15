import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI, AuthType, DataRecovType, ForgotType, SetNewPasswordType } from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { clearProfileDataAC, setProfileAC } from '../Profile/profile-reducer'

const initialState = {
  isLoggedIn: false,
  isSignedUp: false,
  isInitialized: false,
  checkEmail: false,
  saveEmail: '',
  setNewPassword: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setSignUpAC(state, action: PayloadAction<{ isSignedUp: boolean }>) {
      state.isSignedUp = action.payload.isSignedUp
    },
    checkEmailAC(state, action: PayloadAction<{ checkEmail: boolean }>) {
      state.checkEmail = action.payload.checkEmail
    },
    saveEmailAC(state, action: PayloadAction<{ saveEmail: string }>) {
      state.saveEmail = action.payload.saveEmail
    },
    setNewPasswordAC(state, action: PayloadAction<{ setNewPassword: boolean }>) {
      state.setNewPassword = action.payload.setNewPassword
    },
  },
})

export const authReducers = slice.reducer

//Actions

export const { setLoginAC, setSignUpAC, checkEmailAC, saveEmailAC, setNewPasswordAC } =
  slice.actions

//Thunks
export const signInTC =
  (data: AuthType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .login(data)
      .then(res => {
        dispatch(setProfileAC({ profile: res.data }))
        dispatch(setLoginAC({ isLoggedIn: true }))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((err: AxiosError<{ error: string }>) => {
        const error = err.response ? err.response.data.error : err.message

        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(error))
      })
  }

export const signUpTC =
  (data: AuthType): AppThunk =>
  dispatch => {
    authAPI
      .signup(data)
      .then(res => {
        dispatch(setSignUpAC({ isSignedUp: true }))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((err: AxiosError<{ error: string }>) => {
        const error = err.response ? err.response.data.error : err.message

        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(error))
      })
  }

export const passwordRecoveryTC =
  (data: ForgotType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(saveEmailAC({ saveEmail: data.email }))
    const path =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://pavel-grigoryev.github.io/cards-app'

    const dataRec: DataRecovType = {
      email: data.email,
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='${path}/#/set-new-password/$token$'>
link</a>
</div>`,
    }

    authAPI
      .forgot(dataRec)
      .then(res => {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(checkEmailAC({ checkEmail: true }))
      })
      .catch((err: AxiosError<{ error: string }>) => {
        const error = err.response ? err.response.data.error : err.message

        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(error))
      })
  }

export const setNewPasswordTC =
  (data: SetNewPasswordType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .setNewPassword(data)
      .then(res => {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setNewPasswordAC({ setNewPassword: true }))
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
      dispatch(setLoginAC({ isLoggedIn: false }))
      dispatch(clearProfileDataAC())
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC('failed'))
      dispatch(setAppErrorAC(error))
    })
}

// Types
