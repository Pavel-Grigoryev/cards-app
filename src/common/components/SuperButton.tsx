import React from 'react'

import { Button } from '@mui/material'

type SuperButtonType = {
  title: string
  onClick?: () => void
  href?: string
}

export const SuperButton = (props: SuperButtonType) => {
  return (
    <Button
      href={props.href}
      onClick={props.onClick}
      type={'submit'}
      variant={'contained'}
      color={'secondary'}
      fullWidth
      style={{
        fontSize: '16px',
        textTransform: 'capitalize',
        borderRadius: '9999px',
        padding: '4px 16px',
        width: '80%',
        marginTop: '30px',
      }}
    >
      {props.title}
    </Button>
  )
}
