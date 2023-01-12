import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton'
import { SuperPasswordInput } from '../../../common/components/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import { setNewPasswordTC } from '../auth-reducer'
import styles from '../login/Login.module.scss'

type FormikErrorType = {
  password?: string
}

export const CreateNewPassword = () => {
  const setNewPassword = useAppSelector(state => state.auth.setNewPassword)

  const { token } = useParams()

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      password: '',
      resetPasswordToken: token,
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
            minHeight: '372px',
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
              <SuperPasswordInput
                formikErrors={formik.errors.password}
                formikGetFieldProps={{ ...formik.getFieldProps('password') }}
                formikTouched={formik.touched.password}
              />

              <div style={{ margin: '0 10%', textAlign: 'left', lineHeight: '20px' }}>
                Create new password and we will send you further instructions to email
              </div>
              <SuperButton title={'Create new password'} />
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
