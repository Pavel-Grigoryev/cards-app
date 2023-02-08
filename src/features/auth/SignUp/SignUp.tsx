import React from 'react'

import { FormGroup, FormLabel, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { signUpTC } from '../auth-reducer'
import styles from '../Auth.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperEmailInput, SuperPasswordInput } from 'common/components/SuperInputs/SuperInputs'
import { PATH } from 'common/routes/routes'
import { ContainerSX, FormControlSX, FormGroupSX, FormLabelSX } from 'common/styles/sx/sx_styles'
import { signupSchema } from 'common/utils/validationSchema'

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
    },
  })

  if (isSignedUp) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container sx={{ ...ContainerSX }}>
      <Grid item sx={{ ...ContainerSX }}>
        <FormControl sx={{ ...FormControlSX }}>
          <FormLabel sx={{ ...FormLabelSX }}>
            <h1>Sign Up</h1>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ ...FormGroupSX }}>
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
          <NavLink to={`${PATH.LOGIN}`} className={styles.redirectLink}>
            Sign In
          </NavLink>
        </FormControl>
      </Grid>
    </Grid>
  )
}
