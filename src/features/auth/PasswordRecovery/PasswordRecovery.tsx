import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton/SuperButton'
import { SuperEmailInput } from '../../../common/components/SuperInputs/SuperInputs'
import { passwordRecoverySchema } from '../../../common/utils/validationSchema'
import { passwordRecoveryTC } from '../auth-reducer'
import styles from '../Login/Login.module.scss'

import { CheckEmail } from './CheckEmail'

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
      formik.resetForm()
    },
  })

  if (checkEmail) {
    return <CheckEmail />
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl
          style={{
            justifyContent: 'space-evenly',
            marginTop: '30%',
            padding: '30px 0',
            minHeight: '456px',
          }}
          className={styles.loginContainer}
        >
          <FormLabel>
            <h1 style={{ color: '#000000' }}>Forgot your password?</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '300px',
              }}
            >
              <SuperEmailInput
                formikTouched={formik.touched.email}
                formikErrors={formik.errors.email}
                formikGetFieldProps={{ ...formik.getFieldProps('email') }}
              />
              <div
                style={{
                  margin: '-30px 10%',
                  textAlign: 'left',
                  lineHeight: '20px',
                  paddingTop: '20px',
                }}
              >
                Enter your email address and we will send you further instructions{' '}
              </div>
              <SuperButton
                title={'Send Instructions'}
                styleSX={{
                  mt: '30px',
                }}
              />

              <div>Did you remember your password?</div>

              <a
                href={'#/Login'}
                color={'secondary'}
                style={{
                  textDecoration: 'underline',
                  color: '#366eff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Try logging in
              </a>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
