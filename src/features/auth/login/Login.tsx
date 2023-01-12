import React from 'react'

import { Checkbox, FormControlLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton'
import { SuperEmailInput, SuperPasswordInput } from '../../../common/components/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import { signInTC } from '../auth-reducer'

import styles from './Login.module.scss'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      RememberMe: false,
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password length should be more 7 symbol'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(signInTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl
          style={{
            justifyContent: 'space-evenly',
            marginTop: '30%',
            padding: '30px 0',
          }}
          className={styles.loginContainer}
        >
          <FormLabel>
            <h1 style={{ color: '#000000' }}>Sign in</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '400px',
              }}
            >
              <SuperEmailInput
                formikTouched={formik.touched.email}
                formikErrors={formik.errors.email}
                formikGetFieldProps={{ ...formik.getFieldProps('email') }}
              />
              <SuperPasswordInput
                formikErrors={formik.errors.password}
                formikGetFieldProps={{ ...formik.getFieldProps('password') }}
                formikTouched={formik.touched.password}
              />
              <FormControlLabel
                style={{ alignSelf: 'flex-start', marginLeft: '30px' }}
                label={'Remember me'}
                control={
                  <Checkbox
                    color={'secondary'}
                    {...formik.getFieldProps('RememberMe')}
                    checked={formik.values.RememberMe}
                  />
                }
              />
              <div
                style={{
                  alignSelf: 'flex-end',
                  marginRight: '30px',
                }}
              >
                <a href={'#/passRecovery'} style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  Forgot Password?
                </a>
              </div>
              <SuperButton title={'Sign in'} />
              <div style={{ margin: '10px 0 -10px 0' }}>No account?</div>
              <a
                href={'#/signUp'}
                color={'secondary'}
                style={{
                  textDecoration: 'underline',
                  color: '#366eff',
                  fontSize: '16px',
                  marginBottom: '-20px',
                  fontWeight: 'bold',
                }}
              >
                Sign Up
              </a>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
