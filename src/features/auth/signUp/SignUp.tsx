import React from 'react'

import { FormGroup, FormLabel, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import { SuperButton } from '../../../common/components/SuperButton'
import { SuperEmailInput, SuperPasswordInput } from '../../../common/components/SuperInputs'
import { PATH } from '../../../common/routes/routes'
import { signUpTC } from '../auth-reducer'

import styles from './SignUp.module.scss'

type ErrorsType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const SignUp = () => {
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
              />
              <SuperButton title={'Sign Up'} />
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
