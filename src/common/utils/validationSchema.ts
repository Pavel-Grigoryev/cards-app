import * as Yup from 'yup'

export const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

export const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
})
