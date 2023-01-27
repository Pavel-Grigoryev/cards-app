import React, { useEffect } from 'react'

import './App.css'
import { Navigate, Route, Routes, Outlet, useNavigate } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Preloader } from '../common/components/Preloader/Preloader'
import { SuperModal } from '../common/components/SuperModal/SuperModal'
import { useActions } from '../common/hooks/useActions'
import { PATH } from '../common/routes/routes'
import { isInitializedSelector } from '../common/selectors/app-selector'
import { isLoggedInSelector } from '../common/selectors/auth-selector'
import { TestPage } from '../common/testPage/TestPage'
import { CreateNewPassword } from '../features/auth/CreateNewPassword/CreateNewPassword'
import { Login } from '../features/auth/Login/Login'
import { PasswordRecovery } from '../features/auth/PasswordRecovery/PasswordRecovery'
import { SignUp } from '../features/auth/SignUp/SignUp'
import { Error404 } from '../features/Error404/Error404'
import { Layout } from '../features/Layout/Layout'
import { LearnPage } from '../features/Learn/LearnPage'
import { PackPage } from '../features/PackPage/PackPage'
import { PacksList } from '../features/PacksList/PacksList'
import { Profile } from '../features/Profile/Profile'

import { appThunks } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'

const App = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)
  const navigate = useNavigate()

  const studyPackHandler = (packId: string) => {
    navigate(`/learn/${packId}`)
  }

  const PrivateRoutes = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
  }

  const { initializeAppTC } = useActions(appThunks)

  useEffect(() => {
    initializeAppTC({})
  }, [])

  if (!isInitialized) {
    return <Preloader circStyle={{ width: '80px', height: '80px' }} />
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route
              path={PATH.PACKS_LIST}
              element={<PacksList studyPackHandler={studyPackHandler} />}
            />
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route
              path={PATH.PACK_PAGE}
              element={<PackPage studyPackHandler={studyPackHandler} />}
            />
            <Route path={PATH.LEARN_PAGE} element={<LearnPage />} />
            <Route path={PATH.NOT_FOUND} element={<Error404 />} />
            <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND} />} />
            <Route path={PATH.TEST_PAGE} element={<TestPage />} />
          </Route>
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.SIGN_UP} element={<SignUp />} />
          <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
          <Route path={PATH.SET_NEW_PASSWORD} element={<CreateNewPassword />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
