import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { SuperPasswordInput } from '../../../common/components/SuperInputs/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import { createNewPasswordSchema } from '../../../common/utils/validationSchema'
import { setNewPasswordTC } from '../auth-reducer'
import styles from '../Login/Login.module.scss'

export const CreateNewPassword = () => {
  const setNewPassword = useAppSelector(state => state.auth.setNewPassword)

  const { token } = useParams()

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      password: '',
      resetPasswordToken: token,
    },

    validationSchema: createNewPasswordSchema,

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
              <SuperButton
                title={'Create new password'}
                styleSX={{
                  mt: '30px',
                }}
              />
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
