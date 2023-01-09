import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: AuthType) {
    return instance.post<AuthType, AxiosResponse<ResponseType<{ id: number }>>>('/auth/login', data)
  },
  me() {
    return instance.post('/auth/me')
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login')
  },
  signup() {
    return
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
