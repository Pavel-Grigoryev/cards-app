import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { cardsAPI } from 'app/api/cardsAPI/cardsAPI'
import {
  CardType,
  CreateNewCardType,
  GetCardsResponseType,
  GetCardsType,
  SendCardGradeType,
  UpdateCardType,
} from 'app/api/cardsAPI/cardsAPITypes'
import { RequestStatusType, setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'app/store'
import { handleServerNetworkError } from 'common/utils/error-utils'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 1,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 8,
  packUserId: '',
  search: '' as string | undefined,
  sortCards: '',
  packName: '',
  packPrivate: false,
  packDeckCover: '',
  packCardsDeleteStatus: 'idle' as RequestStatusType,
}

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCards(state, action: PayloadAction<{ data: GetCardsResponseType }>) {
      return {
        ...action.payload.data,
        search: state.search,
        packUserId: action.payload.data.packUserId,
        packName: action.payload.data.packName,
        sortCards: state.sortCards,
        packPrivate: action.payload.data.packPrivate,
        packDeckCover: action.payload.data.packDeckCover,
        packCardsDeleteStatus: 'idle',
      }
    },
    updateCardsPagination(state, action: PayloadAction<{ page: number; pageCount: number }>) {
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
    },
    updateCardsSearch(state, action: PayloadAction<{ newValue: string | undefined }>) {
      state.search = action.payload.newValue
    },
    setSortCards(state, action: PayloadAction<{ sortCards: string }>) {
      state.sortCards = action.payload.sortCards
    },
    updateCardGrade(
      state,
      action: PayloadAction<{ shots: number; grade: number; card_id: string }>
    ) {
      const { shots, card_id, grade } = action.payload

      return {
        ...state,
        cards: state.cards.map(c => (c._id === card_id ? { ...c, shots: shots, grade: grade } : c)),
      }
    },
    changePackName(state, action: PayloadAction<{ packName: string }>) {
      state.packName = action.payload.packName
    },

    setPackDeckCover: (state, action: PayloadAction<string>) => {
      state.packDeckCover = action.payload
    },

    changePackCardsDeleteStatus(
      state,
      action: PayloadAction<{ packCardsDeleteStatus: RequestStatusType }>
    ) {
      state.packCardsDeleteStatus = action.payload.packCardsDeleteStatus
    },
  },
})

export const packPageReducer = slice.reducer

// Actions

export const {
  getCards,
  updateCardsSearch,
  updateCardsPagination,
  setSortCards,
  updateCardGrade,
  changePackName,
  setPackDeckCover,
  changePackCardsDeleteStatus,
} = slice.actions

//Thunks

export const getCardsTC =
  (data: GetCardsType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))

    try {
      const res = await cardsAPI.getCards({ ...data })

      dispatch(getCards({ data: res.data }))
      dispatch(setPackDeckCover(res.data.packDeckCover))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const createCardTC =
  (data: CreateNewCardType): AppThunk =>
  async (dispatch, getState) => {
    const { pageCount } = getState().cards

    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.createNewCard(data)

      dispatch(getCardsTC({ cardsPack_id: res.data.newCard.cardsPack_id, pageCount }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const deleteCardTC =
  (data: string): AppThunk =>
  async (dispatch, getState) => {
    const { pageCount, page } = getState().cards

    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.deleteCard(data)

      dispatch(getCardsTC({ cardsPack_id: res.data.deletedCard.cardsPack_id, pageCount, page }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const updateCardTC =
  (data: UpdateCardType): AppThunk =>
  async (dispatch, getState) => {
    const { pageCount, page } = getState().cards

    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.updateCard(data)

      dispatch(getCardsTC({ cardsPack_id: res.data.updatedCard.cardsPack_id, pageCount, page }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const sendCardGradeTC =
  (data: SendCardGradeType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.sendCardGrade(data)
      const { shots, card_id, grade } = res.data.updatedGrade

      dispatch(updateCardGrade({ shots, card_id, grade }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }
