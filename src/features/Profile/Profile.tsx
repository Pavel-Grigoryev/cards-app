import React, { useCallback } from 'react'

import { Grid } from '@mui/material'
import Button from '@mui/material/Button'

import { logoutTC } from '../auth/auth-reducer'

import { InputAvatar } from './InputAvatar/InputAvatar'
import { profileThunks, ProfileType } from './profile-reducer'
import s from './Profile.module.scss'

import { RequestStatusType } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import logoutImg from 'assets/images/logout.svg'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { Preloader } from 'common/components/Preloader/Preloader'
import { ReturnLink } from 'common/components/ReturnLink/ReturnLink'
import { useActions } from 'common/hooks/useActions'
import { PATH } from 'common/routes/routes'
import { entityStatusData, profileData } from 'common/selectors/profile-selector'
import { ContainerSX } from 'common/styles/sx/sx_styles'

export const Profile = () => {
  const profile = useAppSelector<ProfileType | null>(profileData)

  const entityStatus = useAppSelector<RequestStatusType>(entityStatusData)

  const { updateProfileTC } = useActions(profileThunks)

  const dispatch = useAppDispatch()

  const onChangeNameHandler = useCallback(
    (name: string | undefined) => {
      updateProfileTC({ name })
    },
    [dispatch]
  )

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <Grid container sx={{ ...ContainerSX }}>
        <Grid item justifyContent={'center'} xs={12} sm={12}>
          <div className={s.smContainer}>
            <article className={s.profile}>
              {entityStatus === 'loading' && <Preloader contStyle={{ opacity: '0.5' }} />}
              <h1 className={s.title}>Personal Information</h1>
              <div className={s.imageBlock}>
                <InputAvatar />
              </div>
              <EditableSpan value={profile?.name} onChange={onChangeNameHandler} />
              <p className={s.email}>{profile?.email}</p>
              <div className={s.butCont}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={logoutHandler}
                  style={{
                    fontSize: '16px',
                    textTransform: 'none',
                    borderRadius: '9999px',
                    padding: '4px 16px',
                    boxShadow: '0px 2px 10px 0px rgba(109, 109, 109, 0.25)',
                  }}
                >
                  <img className={s.logoutImg} src={logoutImg} alt="" />
                  Log out
                </Button>
              </div>
            </article>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
