import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI, ProfilePayloadType } from '../../app/api'
import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import avatar from '../../assets/images/avatar.jpg'
import { handleServerNetworkError } from '../../common/utils/error-utils'

const initialState = {
  profile: {} as ProfileType,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProfileAC(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = { ...action.payload.profile, avatar: avatar }
    },
    updateProfileAC(state, action: PayloadAction<{ profileUpd: ProfileUpdateType }>) {
      state.profile = { ...state.profile, ...action.payload.profileUpd }
    },
    clearProfileDataAC(state) {
      state.profile = {} as ProfileType
    },
  },
})

export const profileReducer = slice.reducer

//Actions

export const { setProfileAC, updateProfileAC, clearProfileDataAC } = slice.actions

//Thunks

export const updateProfileTC =
  (profileUpd: ProfileUpdateType): AppThunk =>
  (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))

    const profile = getState().userProfile.profile

    if (!profile) {
      console.warn('User not found')
    } else {
      const newProfileModel: ProfilePayloadType = {
        name: profile.name,
        ...profileUpd,
      }

      authAPI
        .updateProfile(newProfileModel)
        .then(res => {
          dispatch(updateProfileAC({ profileUpd: newProfileModel }))

          dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
          handleServerNetworkError(err, dispatch)
        })
    }
  }

//Types

export type ProfileType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

export type ProfileUpdateType = {
  name?: any
  avatar?: any
}

export type InitialStateType = typeof initialState
