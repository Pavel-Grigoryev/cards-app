import React from 'react'

import { Grid } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { PATH } from '../../common/routes/routes'

export const Profile = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  // if (!isLoggedIn) {
  //   return <Navigate to={PATH.LOGIN} />
  // }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}></Grid>
    </Grid>
  )
}
