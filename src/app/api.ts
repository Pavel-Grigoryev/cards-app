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

export const cardsAPI = {
  ///////////////////////////Packs
  getPacks(data: GetPacksType) {
    return instance.get<GetPacksResponseType>(`/cards/pack`, {
      params: { ...data },
    })
  },
  createNewPack(data: CreateNewPackType) {
    return instance.post('/cards/pack', data)
  },
  deletePack(data: string) {
    return instance.delete(`/cards/pack?id=${data}`)
  },
  updatePack(data: UpdatePackType) {
    return instance.put('/cards/pack', data)
  },
  ///////////////////////////Cards
  getCards(data: GetCardsType) {
    return instance.get<GetCardsType, AxiosResponse<GetCardsResponseType>>(`/cards/card`, {
      params: { ...data },
    })
  },
  createNewCard(data: CreateNewCardType) {
    return instance.post('/cards/card', data)
  },
  deleteCard(data: string) {
    return instance.delete(`/cards/card?id=${data}`)
  },
  updateCard(data: UpdateCardType) {
    return instance.put('/cards/card', data)
  },
}

///////////////////////////Types

///////////////////////////authAPI Types
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

///////////////////////////cardsAPI Types

///////////////////////////Packs
export type GetPacksType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  deckCover: string
  grade: number
  more_id: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  __v: number
}

export type GetPacksResponseType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  min: number
  max: number
}

export type CreateNewPackType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type UpdatePackType = {
  cardsPack: {
    _id: string
    name?: string
  }
}

///////////////////////////Cards
export type GetCardsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  rating: number
  comments: string
  __v: string
  type: string
}

export type GetCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
}

export type CreateNewCardType = {
  card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}

export type UpdateCardType = {
  card: {
    _id: string
    question?: string
  }
}
