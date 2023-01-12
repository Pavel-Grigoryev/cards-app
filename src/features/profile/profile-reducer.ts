import { AxiosError } from 'axios'

import { authAPI, ProfilePayloadType } from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import avatar from '../../assets/images/avatar.jpg'

const initialState = {
  profile: {} as ProfileType,
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE':
      return { ...state, profile: { ...action.profile, avatar: avatar } }
    case 'PROFILE/UPDATE-PROFILE':
      return { ...state, profile: { ...state.profile, ...action.profileUpd } }
    case 'PROFILE/CLEAR-DATA':
      return { ...state, profile: {} as ProfileType }
    default:
      return state
  }
}

//Actions

export const setProfileAC = (profile: ProfileType) =>
  ({ type: 'PROFILE/SET-PROFILE', profile } as const)

export const updateProfileAC = (profileUpd: ProfileUpdateType) =>
  ({ type: 'PROFILE/UPDATE-PROFILE', profileUpd } as const)

export const clearProfileDataAC = () => ({ type: 'PROFILE/CLEAR-DATA' } as const)

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
          dispatch(updateProfileAC(newProfileModel))

          dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
          const error = err.response ? err.response.data.error : err.message

          dispatch(setAppStatusAC('failed'))
          dispatch(setAppErrorAC(error))
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

type SetProfileAT = ReturnType<typeof setProfileAC>
type UpdateProfileAT = ReturnType<typeof updateProfileAC>
type ClearProfileDataAT = ReturnType<typeof clearProfileDataAC>

export type ActionsType = SetProfileAT | UpdateProfileAT | ClearProfileDataAT
