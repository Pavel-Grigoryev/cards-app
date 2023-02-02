import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Error404.module.scss'

import notFound from 'assets/images/404.png'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { PATH } from 'common/routes/routes'

export const Error404 = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(PATH.PACKS_LIST)
  }

  return (
    <div className={s.errorPage}>
      <div className={s.wrapper}>
        <div className={s.textBlock}>
          <h1 className={s.title}>Ooops!</h1>
          <p className={s.desc}>Sorry! Page not found!</p>
          <SuperButton title={'Back to home page'} onClick={onClickHandler} />
        </div>
        <div className={s.imageBlock}>
          <img className={s.image} src={notFound} alt="404" />
        </div>
      </div>
    </div>
  )
}
