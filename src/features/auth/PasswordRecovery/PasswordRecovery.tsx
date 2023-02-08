import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { passwordRecoveryTC } from '../auth-reducer'
import styles from '../Auth.module.scss'

import { CheckEmail } from './CheckEmail'
import stylePR from './PasswordRecovery.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperEmailInput } from 'common/components/SuperInputs/SuperInputs'
import { PATH } from 'common/routes/routes'
import {
  ContainerSX,
  FormLabelSX,
  PassRecoveryFormControlSX,
  PassRecoveryFormGroupSX,
} from 'common/styles/sx/sx_styles'
import { passwordRecoverySchema } from 'common/utils/validationSchema'

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const checkEmail = useAppSelector(state => state.auth.checkEmail)

  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: passwordRecoverySchema,

    onSubmit: values => {
      dispatch(passwordRecoveryTC(values))
    },
  })

  if (checkEmail) {
    return <CheckEmail />
  }

  return (
    <Grid container sx={{ ...ContainerSX }}>
      <Grid item sx={{ ...ContainerSX }}>
        <FormControl sx={{ ...PassRecoveryFormControlSX }}>
          <FormLabel sx={{ ...FormLabelSX }}>
            <h1>Forgot your password?</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ ...PassRecoveryFormGroupSX }}>
              <SuperEmailInput
                formikTouched={formik.touched.email}
                formikErrors={formik.errors.email}
                formikGetFieldProps={{ ...formik.getFieldProps('email') }}
              />
              <div className={stylePR.passRecoveryEmailText}>
                Enter your email address and we will send you further instructions{' '}
              </div>
              <SuperButton
                title={'Send Instructions'}
                styleSX={{
                  mt: '30px',
                }}
              />

              <div>Did you remember your password?</div>

              <NavLink to={`${PATH.LOGIN}`} className={styles.redirectLink}>
                Try logging in
              </NavLink>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
