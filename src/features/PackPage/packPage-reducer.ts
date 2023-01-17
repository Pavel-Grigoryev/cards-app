import { createSlice } from '@reduxjs/toolkit'

import { cardsAPI, CreateNewCardType } from '../../app/api'
import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'

const initialState = {}

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
})

export const packPageReducer = slice.reducer

// Actions

export const {} = slice.actions

//Thunks

export const getCardsTC = (): AppThunk => dispatch => {}

export const createCardTC =
  (data: CreateNewCardType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    cardsAPI.createNewCard(data).then(res => {
      console.log(res)
    })
  }
