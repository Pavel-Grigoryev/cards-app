import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: AuthType) {
    return instance.post<AuthType, AxiosResponse<ResponseType<{ id: number }>>>('/auth/login', data)
  },
  me() {
    return instance.post<ResponseType>('/auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('/auth/me')
  },
  signup(data: AuthType) {
    return instance.post<AuthType, AxiosResponse<ResponseType>>('/auth/register', {
      email: data.email,
      password: data.password,
    })
  },
  forgot(data: ForgotType) {
    return instance.post('/auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordType) {
    return instance.post('/auth/set-new-password', data)
  },
  updateProfile(data: ProfilePayloadType) {
    return instance.put<UpdatedUserTypeResponseType>('/auth/me', data)
  },
}

export const cardsAPI = {}

// types
export type AuthType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type ResponseType<D = {}> = {
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

export type ForgotType = {
  email: string
}

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string
}

export type ProfilePayloadType = {
  name: string
  avatar?: string
}

export type UpdatedUserTypeResponseType = {
  updatedUser: UpdatedUserType
  token: string
  tokenDeathTime: number
}
export type UpdatedUserType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}
