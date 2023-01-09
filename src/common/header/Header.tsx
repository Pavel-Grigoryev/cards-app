import React from 'react'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import logo from '../../assets/images/logo.png'
import { ProfileType } from '../../features/profile/profile-reducer'
import { PATH } from '../routes/routes'

import s from './Header.module.scss'

export const Header = () => {
  const navigate = useNavigate()

  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const profile = useAppSelector<ProfileType | null>(state => state.userProfile.profile)

  return (
    <>
      <AppBar position="fixed" style={{ height: '60px' }}>
        <Container
          style={{
            maxWidth: '1056px',
          }}
        >
          <Toolbar
            style={{
              padding: '0',
              justifyContent: 'space-between',
            }}
          >
            <img className={s.image} src={logo} alt="Logo image" />
            <div className={s.butCont}>
              {isLoggedIn ? (
                <div className={s.profileBlock}>
                  <p>{profile?.name}</p>
                  <div>
                    <img src={profile?.avatar} alt="" />
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
