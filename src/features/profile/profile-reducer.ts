import avatar from '../../assets/images/avatar.jpg'

const initialState = {
  profile: null as ProfileType | null,
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE':
      return { ...state, profile: { ...action.profile, avatar: avatar } }
    default:
      return state
  }
}

//Actions

export const setProfileAC = (profile: ProfileType) =>
  ({ type: 'PROFILE/SET-PROFILE', profile } as const)

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

export type InitialStateType = typeof initialState

type SetProfileAT = ReturnType<typeof setProfileAC>

export type ActionsType = SetProfileAT
