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
import {
  ContainerSX,
  FormLabelSX,
  PassRecoveryFormControlSX,
  PassRecoveryFormGroupSX,
} from '../../../common/styles/sx/sx_styles'
import { loginSchema, passwordSchema } from '../../../common/utils/validationSchema'
import { setNewPasswordTC } from '../auth-reducer'
import styles from '../PasswordRecovery/PasswordRecovery.module.scss'

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
    },
  })

  if (setNewPassword) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container sx={{ ...ContainerSX }}>
      <Grid item sx={{ ...ContainerSX }}>
        <FormControl sx={{ ...PassRecoveryFormControlSX }}>
          <FormLabel sx={{ ...FormLabelSX }}>
            <h1>Create new password</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ ...PassRecoveryFormGroupSX }}>
              <SuperPasswordInput
                formikErrors={formik.errors.password}
                formikGetFieldProps={{ ...formik.getFieldProps('password') }}
                formikTouched={formik.touched.password}
              />

              <div className={styles.passRecoveryEmailText}>
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
