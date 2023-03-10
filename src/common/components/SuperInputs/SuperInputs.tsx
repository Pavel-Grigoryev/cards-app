import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'

import styles from '../../styles/errors.module.scss'

type SuperInputType = {
  formikTouched: boolean | undefined
  formikErrors: string | undefined
  formikGetFieldProps: any
  name?: string
}

export const SuperEmailInput = (props: SuperInputType) => {
  return (
    <FormControl sx={{ width: '80%' }} style={{ margin: '10px 0' }} variant="standard">
      <InputLabel color={'secondary'}>Email</InputLabel>
      <Input id="standard-basic" type={'text'} color={'secondary'} {...props.formikGetFieldProps} />
      {props.formikTouched && props.formikErrors && (
        <div className={styles.errorText}>{props.formikErrors}</div>
      )}
    </FormControl>
  )
}

export const SuperPasswordInput = (props: SuperInputType) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl sx={{ width: '80%', margin: '10px 0' }} variant="standard">
      <InputLabel color={'secondary'}>{props.name ? props.name : 'Password'}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        color={'secondary'}
        {...props.formikGetFieldProps}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {props.formikTouched && props.formikErrors && (
        <div className={styles.errorText}>{props.formikErrors}</div>
      )}
    </FormControl>
  )
}
