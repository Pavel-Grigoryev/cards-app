import React from 'react'

import Button from '@mui/material/Button'

export type StyleSXPropsType = {
  mt?: string
  width?: string
  backgroundColor?: string
}

type SuperButtonType = {
  title: string
  styleSX?: StyleSXPropsType
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export const SuperButton = (props: SuperButtonType) => {
  return (
    <Button
      href={props.href}
      onClick={props.onClick}
      type={'submit'}
      variant={'contained'}
      color={'secondary'}
      disabled={props.disabled}
      sx={{
        fontSize: '16px',
        textTransform: 'capitalize',
        borderRadius: '9999px',
        padding: '4px 16px',
        ...props.styleSX,
      }}
    >
      {props.title}
    </Button>
  )
}
