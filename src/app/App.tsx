import React from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Error404 } from '../common/error404/Error404'
import { Layout } from '../common/layout/Layout'
import { PATH } from '../common/routes/routes'
import { TestPage } from '../common/testPage/TestPage'
import { Login } from '../features/auth/login/Login'
import { Profile } from '../features/profile/Profile'
import {SignUp} from "../features/auth/signUp/SignUp";

const App = () => (
  <div className="App">
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<Profile />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.PROFILE} element={<h1>Profile</h1>} />
        <Route path={PATH.PASSWORD_RECOVERY} element={<h1>Password recovery</h1>} />
        <Route path={PATH.NEW_PASSWORD} element={<h1>New password</h1>} />
        <Route path={PATH.NOT_FOUND} element={<Error404 />} />
        <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND} />} />
        <Route path={PATH.TEST_PAGE} element={<TestPage />} />
      </Route>
    </Routes>
  </div>
)

export default App
