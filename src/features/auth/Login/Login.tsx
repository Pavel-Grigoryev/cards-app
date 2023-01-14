import React from 'react'

import { Checkbox, FormControlLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import {
  SuperEmailInput,
  SuperPasswordInput,
} from '../../../common/components/SuperInputs/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import { loginSchema } from '../../../common/utils/validationSchema'
import { signInTC } from '../auth-reducer'

import styles from './Login.module.scss'

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validationSchema: loginSchema,

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
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
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
              <SuperButton
                title={'Sign in'}
                styleSX={{
                  mt: '30px',
                  width: '80%',
                }}
              />
            </FormGroup>
          </form>
          <p>No account?</p>
          <a
            href={'#/SignUp'}
            color={'secondary'}
            style={{
              textDecoration: 'underline',
              color: '#366eff',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </a>
        </FormControl>
      </Grid>
    </Grid>
  )
}
