import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { PATH } from '../../../common/routes/routes'
import { setNewPasswordTC } from '../auth-reducer'
import styles from '../login/Login.module.scss'

type FormikErrorType = {
  password?: string
}

export const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const setNewPassword = useAppSelector(state => state.auth.setNewPassword)
  const url = window.location.href.split('/')

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      password: '',
      resetPasswordToken: url[url.length - 1],
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password length should be more 7 symbol'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(setNewPasswordTC(values))
      formik.resetForm()
    },
  })

  if (setNewPassword) {
    return <Navigate to={PATH.LOGIN} />
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
            <h1 style={{ color: '#000000' }}>Create new password</h1>
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

              <div style={{ margin: '0 10%', textAlign: 'left', lineHeight: '20px' }}>
                Create new password and we will send you further instructions to email
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
                Create new password
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
