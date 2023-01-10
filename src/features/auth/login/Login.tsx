import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/routes/routes'
import { signInTC } from '../auth-reducer'

import styles from './Login.module.scss'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
      } else if (values.password.length < 3) {
        errors.password = 'Password length should be more 3 symbol'
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
              <FormControl sx={{ width: '80%' }} variant="standard">
                <InputLabel color={'secondary'}>Email</InputLabel>
                <Input
                  id="standard-basic"
                  type={'text'}
                  color={'secondary'}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: 'red', margin: '10px 0', textAlign: 'left' }}>
                    {formik.errors.email}
                  </div>
                )}
              </FormControl>
              <FormControl
                sx={{ width: '80%', marginBottom: '-30px', marginTop: '-30px' }}
                variant="standard"
              >
                <InputLabel color={'secondary'}>Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  color={'secondary'}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: 'red', margin: '10px 0', textAlign: 'left' }}>
                    {formik.errors.password}
                  </div>
                )}
              </FormControl>
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
                  color: '#000000',
                  alignSelf: 'flex-end',
                  marginRight: '30px',
                  fontSize: '14px',
                  marginTop: '-25px',
                  marginBottom: '25px',
                }}
              >
                <a href={'#/passRecovery'}>Forgot Password?</a>
              </div>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'secondary'}
                fullWidth
                style={{
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  borderRadius: '9999px',
                  padding: '4px 16px',
                  width: '80%',
                }}
              >
                Sign in
              </Button>
              <div style={{ margin: '10px 0 -10px 0' }}>No account?</div>

              <a
                href={'#/signUp'}
                color={'secondary'}
                style={{
                  textDecoration: 'underline',
                  color: '#366eff',
                  fontSize: '16px',
                  marginBottom: '-20px',
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
