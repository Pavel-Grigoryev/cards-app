import React from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { RequestStatusType } from '../../app/app-reducer'
import { useAppSelector } from '../../app/store'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/routes/routes'
import { ProfileType } from '../Profile/profile-reducer'

import s from './Header.module.scss'

import logo from 'assets/images/logo.png'

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
          <Toolbar className={s.toolbar} style={{ padding: '0' }}>
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
                <SuperButton
                  title={'Sign in'}
                  onClick={() => {
                    navigate(PATH.LOGIN)
                  }}
                />
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
