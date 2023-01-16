import React, { useEffect } from 'react'

import './App.css'
import CircularProgress from '@mui/material/CircularProgress'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { PATH } from '../common/routes/routes'
import { TestPage } from '../common/testPage/TestPage'
import { CreateNewPassword } from '../features/auth/CreateNewPassword/CreateNewPassword'
import { Login } from '../features/auth/Login/Login'
import { PasswordRecovery } from '../features/auth/PasswordRecovery/PasswordRecovery'
import { SignUp } from '../features/auth/SignUp/SignUp'
import { Error404 } from '../features/Error404/Error404'
import { Layout } from '../features/Layout/Layout'
import { PackPage } from '../features/PackPage/PackPage'
import { PacksList } from '../features/PacksList/PacksList'
import { Profile } from '../features/Profile/Profile'

import { initializeAppTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'

const App = () => {
  const dispatch = useAppDispatch()

  const isInitialized = useAppSelector<boolean>(state => state.app.isInit)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress style={{ width: '80px', height: '80px' }} color="secondary" />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.SIGN_UP} element={<SignUp />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
          <Route path={PATH.SET_NEW_PASSWORD} element={<CreateNewPassword />} />
          <Route path={PATH.PACKS_LIST} element={<PacksList />} />
          <Route path={PATH.PACK_PAGE} element={<PackPage />} />
          <Route path={PATH.NOT_FOUND} element={<Error404 />} />
          <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND} />} />
          <Route path={PATH.TEST_PAGE} element={<TestPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
