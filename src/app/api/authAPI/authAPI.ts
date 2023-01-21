import axios, { AxiosResponse } from 'axios'

import {
  AuthType,
  DataRecovType,
  ProfilePayloadType,
  SetNewPasswordType,
  UpdatedUserTypeResponseType,
  ResponseType,
} from './authAPITypes'

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
  forgot(data: DataRecovType) {
    return instance.post('/auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordType) {
    return instance.post('/auth/set-new-password', data)
  },
  updateProfile(data: ProfilePayloadType) {
    return instance.put<UpdatedUserTypeResponseType>('/auth/me', data)
  },
}
