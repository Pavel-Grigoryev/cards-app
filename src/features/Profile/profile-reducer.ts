import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { authAPI } from 'app/api/authAPI/authAPI'
import { ProfilePayloadType } from 'app/api/authAPI/authAPITypes'
import { RequestStatusType, setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'app/store'
import { handleServerNetworkError } from 'common/utils/error-utils'

const initialState = {
  profile: {} as ProfileType,
  entityStatus: 'idle' as RequestStatusType,
}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileAC(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = action.payload.profile
    },
    updateProfileAC(state, action: PayloadAction<{ profileUpd: ProfileUpdateType }>) {
      state.profile = { ...state.profile, ...action.payload.profileUpd }
    },
    clearProfileDataAC(state) {
      state.profile = {} as ProfileType
    },
    updateEntityStatusAC(state, action: PayloadAction<{ entityStatus: RequestStatusType }>) {
      state.entityStatus = action.payload.entityStatus
    },
  },
})

export const profileReducer = slice.reducer

//Actions

export const { setProfileAC, updateProfileAC, clearProfileDataAC, updateEntityStatusAC } =
  slice.actions

//Thunks

export const updateProfileTC =
  (profileUpd: ProfileUpdateType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    dispatch(updateEntityStatusAC({ entityStatus: 'loading' }))
    try {
      const profile = getState().userProfile.profile

      if (!profile) {
        console.warn('User not found')
      } else {
        const newProfileModel: ProfilePayloadType = {
          name: profile.name,
          avatar: profile.avatar,
          ...profileUpd,
        }
        const res = await authAPI.updateProfile(newProfileModel)

        dispatch(updateProfileAC({ profileUpd: newProfileModel }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(updateEntityStatusAC({ entityStatus: 'succeeded' }))
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    } finally {
      dispatch(updateEntityStatusAC({ entityStatus: 'failed' }))
    }
  }

export const profileThunks = { updateProfileTC }

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
