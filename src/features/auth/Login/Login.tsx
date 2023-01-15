import React from 'react'

import { Checkbox, FormControlLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import {
  SuperEmailInput,
  SuperPasswordInput,
} from '../../../common/components/SuperInputs/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import {
  ContainerSX,
  FormControlLabelSX,
  FormControlSX,
  FormGroupSX,
  FormLabelSX,
} from '../../../common/styles/sx/sx_styles'
import { loginSchema } from '../../../common/utils/validationSchema'
import { signInTC } from '../auth-reducer'
import styles from '../Auth.module.scss'

import stylesLogin from './Login.module.scss'

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
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <Grid container sx={{ ...ContainerSX }}>
      <Grid item sx={{ ...ContainerSX }}>
        <FormControl sx={{ ...FormControlSX }}>
          <FormLabel sx={{ ...FormLabelSX }}>
            <h1>Sign in</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ ...FormGroupSX }}>
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
                sx={{ ...FormControlLabelSX }}
                label={'Remember me'}
                control={
                  <Checkbox
                    color={'secondary'}
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <div className={stylesLogin.rememberMe}>
                <NavLink to={`${PATH.PASSWORD_RECOVERY}`} className={stylesLogin.passRecoveryLink}>
                  Forgot Password?
                </NavLink>
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
          <NavLink to={`${PATH.SIGN_UP}`} className={styles.redirectLink}>
            Sign Up
          </NavLink>
        </FormControl>
      </Grid>
    </Grid>
  )
}
