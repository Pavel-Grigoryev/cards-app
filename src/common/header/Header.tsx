import React from 'react'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { RequestStatusType } from '../../app/app-reducer'
import { useAppSelector } from '../../app/store'
import logo from '../../assets/images/logo.png'
import { ProfileType } from '../../features/profile/profile-reducer'
import { PATH } from '../routes/routes'

import s from './Header.module.scss'

export const Header = () => {
  const navigate = useNavigate()

  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  const profile = useAppSelector<ProfileType | null>(state => state.userProfile.profile)

  return (
    <>
      <AppBar className={s.header} position="fixed">
        <Container
          style={{
            maxWidth: '1056px',
          }}
        >
          <Toolbar className={s.toolbar}>
            <img className={s.image} src={logo} alt="Logo image" />

            {isLoggedIn ? (
              <div className={s.profileBlock}>
                <p className={s.profileName}>{profile?.name}</p>
                <div className={s.profileImgWrap}>
                  <img className={s.profileImg} src={profile?.avatar} alt="" />
                </div>
              </div>
            ) : (
              <div className={s.butCont}>
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    navigate(PATH.LOGIN)
                  }}
                  style={{
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    borderRadius: '9999px',
                    padding: '4px 16px',
                  }}
                >
                  Sing in
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
        {status === 'loading' && (
          <LinearProgress
            color={'secondary'}
            style={{
              position: 'absolute',
              bottom: '0',
              width: '100%',
            }}
          />
        )}
      </AppBar>
    </>
  )
}
