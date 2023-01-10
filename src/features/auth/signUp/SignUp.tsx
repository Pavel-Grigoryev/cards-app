import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import { PATH } from '../../../common/routes/routes'
import { signUpTC } from '../auth-reducer'

import styles from './SignUp.module.scss'

type ErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => setShowPassword(show => !show)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: ErrorsType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords should match'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(signUpTC(values))
      formik.resetForm()
    },
  })

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl
          style={{
            justifyContent: 'space-evenly',
            marginTop: '30%',
            padding: '30px 0',
          }}
          className={styles.item}
        >
          <FormLabel style={{ color: '#000000' }}>
            <h1>Sign Up</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '300px',
              }}
            >
              <FormControl sx={{ width: '80%' }} variant="standard">
                <InputLabel color={'secondary'} htmlFor="email-handle-input">
                  Email
                </InputLabel>
                <Input
                  id="email-handle-input"
                  type={'text'}
                  color={'secondary'}
                  error={formik.touched.email && !!formik.errors.email}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: 'red', margin: '10px 0', textAlign: 'left' }}>
                    {formik.errors.email}
                  </div>
                )}
              </FormControl>
              <FormControl sx={{ width: '80%' }} variant="standard">
                <InputLabel color={'secondary'} htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  color={'secondary'}
                  error={formik.touched.password && !!formik.errors.password}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        onMouseDown={() => {}}
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
              <FormControl sx={{ width: '80%' }} variant="standard">
                <InputLabel color={'secondary'} htmlFor="confirm-password">
                  Confirm password
                </InputLabel>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  color={'secondary'}
                  error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  {...formik.getFieldProps('confirmPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        onMouseDown={() => {}}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div style={{ color: 'red', margin: '10px 0', textAlign: 'left' }}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
              </FormControl>
              <Button
                type={'submit'}
                color={'secondary'}
                variant="contained"
                style={{
                  fontSize: '16px',
                  textTransform: 'capitalize',
                  borderRadius: '9999px',
                  padding: '4px 16px',
                  width: '80%',
                }}
              >
                Sign Up
              </Button>
            </FormGroup>
          </form>
          <p>Already have an account?</p>
          <span>
            <NavLink to={`${PATH.LOGIN}`}>Sign In</NavLink>
          </span>
        </FormControl>
      </Grid>
    </Grid>
  )
}
