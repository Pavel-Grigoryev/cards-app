import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'

type SuperInputType = {
  formikTouched: boolean | undefined
  formikErrors: string | undefined
  formikGetFieldProps: any
}

export const SuperEmailInput = (props: SuperInputType) => {
  return (
    <FormControl sx={{ width: '80%' }} variant="standard">
      <InputLabel color={'secondary'}>Email</InputLabel>
      <Input id="standard-basic" type={'text'} color={'secondary'} {...props.formikGetFieldProps} />
      {props.formikTouched && props.formikErrors && (
        <div style={{ color: 'red', margin: '10px 0', textAlign: 'left' }}>
          {props.formikErrors}
        </div>
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
    <FormControl sx={{ width: '80%' }} variant="standard">
      <InputLabel color={'secondary'}>Password</InputLabel>
      <Input
        id="standard-adornment-password"
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
        <div style={{ color: 'red', margin: '10px 0', textAlign: 'left' }}>
          {props.formikErrors}
        </div>
      )}
    </FormControl>
  )
}
