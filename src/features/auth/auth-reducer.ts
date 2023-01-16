import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { authAPI, AuthType, DataRecovType, ForgotType, SetNewPasswordType } from '../../app/api'
import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/error-utils'
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

//thunks
export const signInTC =
  (data: AuthType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authAPI.login(data)

      dispatch(setProfileAC({ profile: res.data }))
      dispatch(setLoginAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const signUpTC =
  (data: AuthType): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.signup(data)

      dispatch(setSignUpAC({ isSignedUp: true }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const passwordRecoveryTC =
  (data: ForgotType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(saveEmailAC({ saveEmail: data.email }))
    try {
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

      const res = await authAPI.forgot(dataRec)

      dispatch(setAppStatusAC({ status: 'succeeded' }))
      dispatch(checkEmailAC({ checkEmail: true }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const setNewPasswordTC =
  (data: SetNewPasswordType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await authAPI.setNewPassword(data)

      dispatch(setAppStatusAC({ status: 'succeeded' }))
      dispatch(setNewPasswordAC({ setNewPassword: true }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const res = await authAPI.logout()

    dispatch(setAppStatusAC({ status: 'succeeded' }))
    dispatch(setLoginAC({ isLoggedIn: false }))
    dispatch(clearProfileDataAC())
  } catch (e) {
    if (axios.isAxiosError(e)) {
      handleServerNetworkError(e, dispatch)
    }
  }
}
