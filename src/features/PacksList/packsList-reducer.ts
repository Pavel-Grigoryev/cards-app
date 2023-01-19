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
import { defaultFilterValues } from '../../common/components/Filters/Filters'
import { handleServerNetworkError } from '../../common/utils/error-utils'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 1,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 8,
  search: '' as string | undefined,
  sortPacks: '',
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

    resetFilters(state, action: PayloadAction<typeof defaultFilterValues>) {
      return {
        ...state,
        page: action.payload.page,
        sortPacks: action.payload.sortPacks,
        pageCount: action.payload.pageCount,
        search: action.payload.search,
      }
    },
  },
})

export const packListReducer = slice.reducer

// Actions

export const { getPacks, updatePacksPagination, updateSearch, setSort, resetFilters } =
  slice.actions

//Thunks

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  const { page, pageCount, search, sortPacks } = getState().packs

  try {
    const res = await cardsAPI.getPacks({ page, pageCount, packName: search, sortPacks })

    //console.log(res)

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
