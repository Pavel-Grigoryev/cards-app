import { AxiosResponse } from 'axios'

import { instance } from '../authAPI/authAPI'

import {
  CreateNewCardType,
  CreateNewPackType,
  GetCardsResponseType,
  GetCardsType,
  GetPacksResponseType,
  GetPacksType,
  SendCardGradeResponseType,
  SendCardGradeType,
  UpdateCardType,
  UpdatePackType,
} from './cardsAPITypes'

export const cardsAPI = {
  ///////////////////////////Packs
  getPacks(params: GetPacksType) {
    return instance.get<GetPacksResponseType>(`/cards/pack`, {
      params,
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
  getCards(params: GetCardsType) {
    return instance.get<GetCardsType, AxiosResponse<GetCardsResponseType>>(`/cards/card`, {
      params,
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
  sendCardGrade(data: SendCardGradeType) {
    return instance.put<SendCardGradeType, AxiosResponse<SendCardGradeResponseType>>(
      '/cards/grade',
      data
    )
  },
}
