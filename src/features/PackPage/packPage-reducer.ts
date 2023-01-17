import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { cardsAPI, CardType, CreateNewCardType, GetCardsType, UpdateCardType } from '../../app/api'
import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/error-utils'

const initialState = {
  cardList: [] as CardType[],
}

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCards(state, action: PayloadAction<{ cards: CardType[] }>) {
      state.cardList = action.payload.cards
    },
  },
})

export const packPageReducer = slice.reducer

// Actions

export const { getCards } = slice.actions

//Thunks

export const getCardsTC =
  (data: GetCardsType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))

    try {
      const res = await cardsAPI.getCards(data)

      dispatch(getCards({ cards: res.data.cards }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const createCardTC =
  (data: CreateNewCardType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.createNewCard(data)

      dispatch(getCardsTC({ cardsPack_id: res.data.newCard.cardsPack_id }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const deleteCardTC =
  (data: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.deleteCard(data)

      dispatch(getCardsTC({ cardsPack_id: res.data.deletedCard.cardsPack_id }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const updateCardTC =
  (data: UpdateCardType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.updateCard(data)

      dispatch(getCardsTC({ cardsPack_id: res.data.updatedCard.cardsPack_id }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }
