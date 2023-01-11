import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import sendMessagePic from '../../../assets/images/sendMessage.png'
import { SuperButton } from '../../../common/components/SuperButton'
import { SuperEmailInput } from '../../../common/components/SuperInputs'
import { checkEmailAC, passwordRecoveryTC, saveEmailAC } from '../auth-reducer'
import styles from '../login/Login.module.scss'

type FormikErrorType = {
  email?: string
}

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const checkEmail = useAppSelector(state => state.auth.checkEmail)
  const saveEmail = useAppSelector(state => state.auth.saveEmail)
  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(passwordRecoveryTC(values))
      formik.resetForm()
    },
  })

  if (checkEmail) {
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
              href={'#/login'}
              title={'Back to login'}
              onClick={() => {
                dispatch(checkEmailAC(false))
                dispatch(saveEmailAC(''))
              }}
            />
          </div>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl
          style={{
            justifyContent: 'space-evenly',
            marginTop: '30%',
            padding: '30px 0',
            minHeight: '456px',
          }}
          className={styles.loginContainer}
        >
          <FormLabel>
            <h1 style={{ color: '#000000' }}>Forgot your password?</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '300px',
              }}
            >
              <SuperEmailInput
                formikTouched={formik.touched.email}
                formikErrors={formik.errors.email}
                formikGetFieldProps={{ ...formik.getFieldProps('email') }}
              />
              <div style={{ margin: '-30px 10%', textAlign: 'left', lineHeight: '20px' }}>
                Enter your email address and we will send you further instructions{' '}
              </div>
              <SuperButton title={'Send Instructions'} />

              <div>Did you remember your password?</div>

              <a
                href={'#/login'}
                color={'secondary'}
                style={{
                  textDecoration: 'underline',
                  color: '#366eff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Try logging in
              </a>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
