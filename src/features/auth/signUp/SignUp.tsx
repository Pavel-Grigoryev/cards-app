import React from 'react'

import { TextField } from '@mui/material'
import { useFormik } from 'formik'

type ErrorsType = {
  email?: string
  password?: string
}

export const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
      const errors: ErrorsType = {}

      /*if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Min password length should be 3 characters'
      }*/

      return errors
    },
    onSubmit: values => {},
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Sign Up</h1>
      <div>
        <TextField label="email" margin="normal" {...formik.getFieldProps('email')} />
        <TextField label="password" margin="normal" {...formik.getFieldProps('password')} />
      </div>
    </form>
  )
}
