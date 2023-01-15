import React from 'react'

import Grid from '@mui/material/Grid'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import sendMessagePic from '../../../assets/images/sendMessage.png'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { PATH } from '../../../common/routes/routes'
import { ContainerSX } from '../../../common/styles/sx/sx_styles'
import { checkEmailAC, saveEmailAC } from '../auth-reducer'

import stylePR from './PasswordRecovery.module.scss'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()

  const saveEmail = useAppSelector(state => state.auth.saveEmail)

  return (
    <Grid container sx={{ ...ContainerSX }}>
      <Grid item sx={{ ...ContainerSX }}>
        <div className={stylePR.wrapper}>
          <h1 className={stylePR.title}>Check Email</h1>

          <img className={stylePR.img} src={sendMessagePic} alt={'Send message pic'} />

          <div className={stylePR.text}>We’ve sent an Email with instructions to {saveEmail}</div>
          <SuperButton
            href={`${PATH.LOGIN}`}
            title={'Back to Login'}
            onClick={() => {
              dispatch(checkEmailAC({ checkEmail: false }))
              dispatch(saveEmailAC({ saveEmail: ' ' }))
            }}
          />
        </div>
      </Grid>
    </Grid>
  )
}
