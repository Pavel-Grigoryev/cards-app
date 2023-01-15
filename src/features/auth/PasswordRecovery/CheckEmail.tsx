import React from 'react'

import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import sendMessagePic from '../../../assets/images/sendMessage.png'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { checkEmailAC, saveEmailAC } from '../auth-reducer'
import styles from '../Login/Login.module.scss'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()

  const saveEmail = useAppSelector(state => state.auth.saveEmail)

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <div
          style={{
            justifyContent: 'space-evenly',
            marginTop: '30%',
            padding: '30px 0',
            minHeight: '408px',
          }}
          className={styles.loginContainer}
        >
          <FormLabel>
            <h1 style={{ color: '#000000', marginBottom: '20px' }}>Check Email</h1>
          </FormLabel>

          <img
            style={{ width: '150px', height: '150px', marginBottom: '20px' }}
            src={sendMessagePic}
            alt={'Send message pic'}
          />

          <div style={{ marginBottom: '20px' }}>
            We’ve sent an Email with instructions to {saveEmail}
          </div>
          <SuperButton
            href={'#/Login'}
            title={'Back to Login'}
            onClick={() => {
              dispatch(checkEmailAC({ checkEmail: false }))
              dispatch(saveEmailAC({ saveEmail: '' }))
            }}
          />
        </div>
      </Grid>
    </Grid>
  )
}
