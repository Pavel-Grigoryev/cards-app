import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setLoginAC } from '../features/auth/auth-reducer'
import { setProfileAC } from '../features/Profile/profile-reducer'

import { authAPI } from './api'
import { AppThunk } from './store'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInit: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppInitializedAC(state, action: PayloadAction<{ isInit: boolean }>) {
      state.isInit = action.payload.isInit
    },
  },
})

export const appReducer = slice.reducer

//Actions

export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } = slice.actions

//Thunk

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC({ status: 'loading' }))

  authAPI
    .me()
    .then(res => {
      dispatch(setLoginAC({ isLoggedIn: true }))
      dispatch(setProfileAC({ profile: res.data }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    })
    .catch((err: AxiosError<{ error: string }>) => {
      console.log(err)
      // handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(setAppInitializedAC({ isInit: true }))
      dispatch(setAppStatusAC({ status: 'idle' }))
    })
}

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
