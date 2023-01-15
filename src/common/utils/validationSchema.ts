import * as Yup from 'yup'

const validate = {
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
}

export const signupSchema = Yup.object().shape({
  email: validate.email,
  password: validate.password,
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const loginSchema = Yup.object().shape({
  email: validate.email,
  password: validate.password,
})

export const passwordRecoverySchema = Yup.object().shape({
  email: validate.email,
})

export const createNewPasswordSchema = Yup.object().shape({
  password: validate.password,
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().min(7, 'Too Short!').max(50, 'Too Long!').required('Required'),
})
