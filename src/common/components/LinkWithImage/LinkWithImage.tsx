import React from 'react'

import s from './LinkWithImage.module.scss'

export const LinkWithImage = ({ callback, title, img }: LinkWithImagePropsType) => {
  return (
    <li className={s.linkBlock}>
      <button className={s.button} onClick={callback}>
        <img className={s.image} src={img} alt="" />
        <span className={s.title}>{title}</span>
      </button>
    </li>
  )
}

//Types

export type LinkWithImagePropsType = {
  callback: () => void
  title: string
  img: string
  id?: string
}
