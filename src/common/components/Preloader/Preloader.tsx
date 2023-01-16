import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from './Preloader.module.scss'

export const Preloader = ({ contStyle, circStyle }: PropsType) => {
  return (
    <div className={s.preloadCont} style={contStyle}>
      <CircularProgress style={circStyle} color="secondary" />
    </div>
  )
}

//Types

type PropsType = {
  contStyle?: ContStyleType
  circStyle?: CircStyleType
}

type ContStyleType = {
  opacity?: string
}

type CircStyleType = {
  width?: string
  height?: string
}
