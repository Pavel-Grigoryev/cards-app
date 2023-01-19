import React from 'react'

import notFoundImg from '../../../assets/images/not-found.png'

import s from './NotFound.module.scss'

export const NotFound = ({ message }: NotFoundType) => {
  return (
    <div>
      <div className={s.imgCont}>
        <img className={s.img} src={notFoundImg} alt="Not found" />
      </div>
      <p className={s.desc}>{message}</p>
    </div>
  )
}

//Types

type NotFoundType = {
  message: string
}
