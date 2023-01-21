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

export type DataRecovType = ForgotType & {
  message: string
}

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
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
