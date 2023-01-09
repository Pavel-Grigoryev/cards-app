import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { PATH } from '../../common/routes/routes'

export const Profile = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}
