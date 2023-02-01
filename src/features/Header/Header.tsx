import React, { useEffect, useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { Link, useNavigate } from 'react-router-dom'

import s from './Header.module.scss'
import { ProfileLink } from './ProfileLink/ProfileLink'

import { useAppSelector } from 'app/store'
import logo from 'assets/images/logo.svg'
import noAva from 'assets/images/no_avatar.svg'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperTooltip } from 'common/components/SuperTooltip/SuperTooltip'
import { PATH } from 'common/routes/routes'
import { statusData } from 'common/selectors/app-selector'
import { isLoggedInSelector } from 'common/selectors/auth-selector'
import { avatarData, nameData } from 'common/selectors/profile-selector'

export const Header = () => {
  const navigate = useNavigate()

  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [ava, setAva] = useState(noAva)

  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const status = useAppSelector(statusData)
  const name = useAppSelector(nameData)
  const avatar = useAppSelector(avatarData)

  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  useEffect(() => {
    if (avatar) {
      setAva(avatar)
      setIsAvaBroken(false)
    }
  }, [avatar])

  return (
    <>
      <AppBar className={s.header} position="fixed">
        <Container
          style={{
            maxWidth: '1056px',
          }}
        >
          <Toolbar className={s.toolbar} style={{ padding: '0' }}>
            <Link to={PATH.PACKS_LIST}>
              <img className={s.image} src={logo} alt="Logo image" />
            </Link>
            {isLoggedIn ? (
              <div className={s.profileBlock}>
                <p className={s.profileName}>{name}</p>
                <SuperTooltip title={<ProfileLink />} placement={'bottom-end'}>
                  <button className={s.profileImgWrap}>
                    <img
                      className={s.profileImg}
                      src={isAvaBroken ? noAva : ava}
                      alt="avatar"
                      onError={errorHandler}
                    />
                  </button>
                </SuperTooltip>
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
