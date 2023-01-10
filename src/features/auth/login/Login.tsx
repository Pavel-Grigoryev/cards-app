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

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { signInTC } from '../auth-reducer'

import style from './Login.module.scss'

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

  // if(isLoggedIn) {
  //   return <Navigate to={'/'}/>
  // }

  return (
    <div>
      <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'} className={style.loginContainer}>
          <FormLabel>
            <h1 style={{ color: '#000000' }}>Sign in</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                <InputLabel>Email</InputLabel>
                <Input id="standard-basic" type={'text'} {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                <InputLabel>Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
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
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                )}
              </FormControl>
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('RememberMe')}
                    checked={formik.values.RememberMe}
                  />
                }
              />
              <div style={{ margin: '25px' }}>
                <a href={'#/passRecovery'}>Forgot Password?</a>
              </div>
              <div>
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
              </div>
              <div style={{ margin: '30px 0 10px 0' }}>Already have an account?</div>
              <a href={'#/signUp'}>Sign Up</a>
            </FormGroup>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}
