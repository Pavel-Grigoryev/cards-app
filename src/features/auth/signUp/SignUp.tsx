import React from 'react'

import { FormGroup, FormLabel, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton'
import { SuperEmailInput, SuperPasswordInput } from '../../../common/components/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import { signupSchema } from '../../../common/utils/validationSchema'
import { signUpTC } from '../auth-reducer'

import styles from './SignUp.module.scss'

/*type ErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
}*/

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const isSignedUp = useAppSelector(state => state.auth.isSignedUp)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: signupSchema,

    onSubmit: values => {
      dispatch(signUpTC(values))
      formik.resetForm()
    },
  })

  if (isSignedUp) {
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
          className={styles.item}
        >
          <FormLabel style={{ color: '#000000' }}>
            <h1>Sign Up</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <FormGroup
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
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
              <SuperPasswordInput
                formikErrors={formik.errors.confirmPassword}
                formikGetFieldProps={{ ...formik.getFieldProps('confirmPassword') }}
                formikTouched={formik.touched.confirmPassword}
                name={'Confirm password'}
              />
              <SuperButton
                title={'Sign Up'}
                styleSX={{
                  mt: '30px',
                  width: '80%',
                }}
              />
            </FormGroup>
          </form>
          <p>Already have an account?</p>
          <NavLink
            to={`${PATH.LOGIN}`}
            style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
              color: '#366eff',
              fontSize: '16px',
            }}
          >
            Sign In
          </NavLink>
        </FormControl>
      </Grid>
    </Grid>
  )
}
