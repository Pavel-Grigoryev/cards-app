import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios/index'

import { cardsAPI, CardType, CreateNewCardType, GetCardsType } from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'

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

      console.log(res)
      dispatch(getCards({ cards: res.data.cards }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err: AxiosError<{ error: string }> | any) {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC({ status: 'failed' }))
      dispatch(setAppErrorAC({ error }))
    }
  }

export const createCardTC =
  (data: CreateNewCardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    cardsAPI.createNewCard(data).then(res => {
      console.log(res)
    })
  }
