import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  changePackCardsDeleteStatus,
  changePackName,
  setPackDeckCover,
} from '../PackPage/packPage-reducer'

import { cardsAPI } from 'app/api/cardsAPI/cardsAPI'
import {
  CreateNewPackType,
  GetPacksResponseType,
  PackType,
  UpdatePackType,
} from 'app/api/cardsAPI/cardsAPITypes'
import { setAppErrorAC, setAppStatusAC } from 'app/app-reducer'
import { AppThunk } from 'app/store'
import { handleServerNetworkError } from 'common/utils/error-utils'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 1,
  maxCardsCount: 0,
  minCardsCount: 0,
  max: 0,
  min: 0,
  page: 1,
  pageCount: 8,
  search: '' as string | undefined,
  sortPacks: '',
  showPackCards: 'all' as ShowPackCardsType,
}

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    getPacks(state, action: PayloadAction<{ data: GetPacksResponseType }>) {
      return {
        ...action.payload.data,
        search: state.search,
        sortPacks: state.sortPacks,
        showPackCards: state.showPackCards,
        maxCardsCount: state.maxCardsCount,
        minCardsCount: state.minCardsCount,
        max: state.max,
        min: state.min,
      }
    },

    updatePacksPagination(state, action: PayloadAction<{ page: number; pageCount: number }>) {
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
    },
    updateSearch(state, action: PayloadAction<{ newValue: string | undefined }>) {
      state.search = action.payload.newValue
    },

    setSort(state, action: PayloadAction<{ sortPacks: string }>) {
      state.sortPacks = action.payload.sortPacks
    },

    resetFilters(state) {
      state.sortPacks = ''
      state.search = ''
      state.page = 1
      state.pageCount = 8
      state.showPackCards = 'all'
      state.maxCardsCount = 0
      state.minCardsCount = 0
      state.min = 0
      state.max = 0
    },

    setPacksCount(state, action: PayloadAction<{ values: number[] }>) {
      state.minCardsCount = action.payload.values[0]
      state.maxCardsCount = action.payload.values[1]
    },

    setCardsCount(state, action: PayloadAction<{ values: number[] }>) {
      state.min = action.payload.values[0]
      state.max = action.payload.values[1]
    },
    updateShowPackCards(state, action: PayloadAction<{ butValue: ShowPackCardsType }>) {
      state.showPackCards = action.payload.butValue
    },
  },
})

export const packListReducer = slice.reducer

// Actions

export const {
  getPacks,
  updatePacksPagination,
  updateSearch,
  setSort,
  resetFilters,
  setCardsCount,
  updateShowPackCards,
  setPacksCount,
} = slice.actions

//Thunks

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  const { page, pageCount, search, sortPacks, min, max, showPackCards } = getState().packs
  const { _id } = getState().userProfile.profile
  const user_id = showPackCards === 'my' ? _id : ''

  try {
    const res = await cardsAPI.getPacks({
      packName: search,
      min,
      max,
      page,
      pageCount,
      user_id,
      sortPacks,
    })

    dispatch(getPacks({ data: res.data }))
    dispatch(setPacksCount({ values: [res.data.minCardsCount, res.data.maxCardsCount] }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
  } catch (e) {
    if (axios.isAxiosError(e)) {
      handleServerNetworkError(e, dispatch)
    }
  }
}

export const createNewPackTC =
  (data: CreateNewPackType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.createNewPack(data)

      dispatch(getPacksTC())
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const deletePackTC =
  (data: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const packCardsDeleteStatus = getState().cards.packCardsDeleteStatus

    try {
      const res = await cardsAPI.deletePack(data)

      if (packCardsDeleteStatus !== 'loading') {
        dispatch(getPacksTC())
      } else {
        dispatch(changePackCardsDeleteStatus({ packCardsDeleteStatus: 'succeeded' }))
      }
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        handleServerNetworkError(e, dispatch)
      }
    }
  }

export const updatePackTC =
  (data: UpdatePackType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.updatePack(data)

      dispatch(changePackName({ packName: res.data.updatedCardsPack.name }))
      dispatch(setPackDeckCover(res.data.updatedCardsPack.deckCover))
      dispatch(getPacksTC())
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err: AxiosError<{ error: string }> | any) {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC({ status: 'failed' }))
      dispatch(setAppErrorAC({ error }))
    }
  }

export const packThunks = {
  getPacksTC,
  createNewPackTC,
  deletePackTC,
  updatePackTC,
  getPacks,
  updatePacksPagination,
  updateSearch,
  setSort,
  resetFilters,
  setCardsCount,
  updateShowPackCards,
  setPacksCount,
}

//Types

export type ShowPackCardsType = 'all' | 'my'
