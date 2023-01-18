import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  cardsAPI,
  CreateNewPackType,
  GetPacksResponseType,
  PackType,
  UpdatePackType,
} from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/error-utils'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
  search: '',
}

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    getPacks(state, action: PayloadAction<{ data: GetPacksResponseType }>) {
      state = { ...action.payload.data, search: '' }
    },

    updatePacksPagination(state, action: PayloadAction<{ page: number; pageCount: number }>) {
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
    },
  },
})

export const packListReducer = slice.reducer

// Actions

export const { getPacks, updatePacksPagination } = slice.actions

//Thunks

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  const { page, pageCount } = getState().packs

  try {
    const res = await cardsAPI.getPacks({ page, pageCount })

    console.log(res)

    dispatch(getPacks({ data: res.data }))
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
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.deletePack(data)

      dispatch(getPacksTC())
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

      dispatch(getPacksTC())
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err: AxiosError<{ error: string }> | any) {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC({ status: 'failed' }))
      dispatch(setAppErrorAC({ error }))
    }
  }
