import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducers } from '../features/auth/auth-reducer'
import { packPageReducer } from '../features/PackPage/packPage-reducer'
import { packListReducer } from '../features/PacksList/packsList-reducer'
import { profileReducer } from '../features/Profile/profile-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducers,
  userProfile: profileReducer,
  cards: packPageReducer,
  packs: packListReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//Types

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
