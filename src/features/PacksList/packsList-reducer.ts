import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { cardsAPI, CreateNewPackType, GetPacksResponseType, PackType } from '../../app/api'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 8,
}

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    getPacks(state, action: PayloadAction<{ data: GetPacksResponseType }>) {
      return action.payload.data
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
  } catch (err: AxiosError<{ error: string }> | any) {
    const error = err.response ? err.response.data.error : err.message

    dispatch(setAppStatusAC({ status: 'failed' }))
    dispatch(setAppErrorAC({ error }))
  }
}

export const createNewPackTC =
  (data: CreateNewPackType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const res = await cardsAPI.createNewPack(data)

      console.log(res)
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (err: AxiosError<{ error: string }> | any) {
      const error = err.response ? err.response.data.error : err.message

      dispatch(setAppStatusAC({ status: 'failed' }))
      dispatch(setAppErrorAC({ error }))
    }
  }
